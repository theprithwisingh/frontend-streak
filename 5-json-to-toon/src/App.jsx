import React, { useState } from 'react';
import './index.css';

export default function App() {
  const [jsonText, setJsonText] = useState('');
  const [toonText, setToonText] = useState('');

  /**
   * TOON Formal Specification & Grammar:
   * 
   * 1. Arrays contain ordered elements that can resolve to: `VALUE` | `OBJECT` | `ARRAY`.
   * 2. Array elements naturally skip attribution; they do NOT have a `KEY` assigned to them.
   * 3. Nested arrays are strictly allowed as anonymous structures without identifiers (eg. `ARRAY_START` -> `ARRAY_END`).
   * 4. Object properties mandate an explicit attributed `KEY`.
   * 5. All keys are strictly stringified (e.g. `KEY ""`, `KEY "@special"`) to assure deterministic boundaries.
   */
  const jsonToTOON = (obj) => {
    const tokens = [];
    const stack = [];

    const safePush = (type) => {
      stack.push(type);
    };

    const safePop = (expected) => {
      if (stack.length === 0) {
        throw new Error(`Structure mismatch: Stack underflow when expecting to close ${expected}`);
      }
      const top = stack.pop();
      if (top !== expected) {
        throw new Error(`Structure mismatch: Found ${top} but expected to close ${expected}`);
      }
    };

    const dfs = (node, key) => {
      const hasKey = key !== undefined;
      const keyStr = hasKey ? JSON.stringify(String(key)) : null;

      if (node === null || typeof node !== 'object') {
        if (hasKey) {
          tokens.push(`KEY ${keyStr} VALUE ${JSON.stringify(node)}`);
        } else {
          tokens.push(`VALUE ${JSON.stringify(node)}`);
        }
        return;
      }

      if (Array.isArray(node)) {
        if (hasKey) {
          tokens.push(`KEY ${keyStr}`);
          tokens.push(`ARRAY_START ${keyStr}`);
        } else {
          tokens.push(`ARRAY_START`);
        }

        safePush("ARRAY");
        for (let i = 0; i < node.length; i++) {
          dfs(node[i]);
        }
        safePop("ARRAY");

        tokens.push(`ARRAY_END`);
      } else {
        if (hasKey) {
          tokens.push(`KEY ${keyStr}`);
        }
        tokens.push(`OBJECT_START`);

        safePush("OBJECT");
        for (const k in node) {
          if (Object.prototype.hasOwnProperty.call(node, k)) {
            dfs(node[k], k);
          }
        }
        safePop("OBJECT");

        tokens.push(`OBJECT_END`);
      }
    };

    dfs(obj);

    if (stack.length !== 0) {
      throw new Error("Structure mismatch: Stack not empty at the end of execution.");
    }

    return tokens.join('\n');
  };

  /**
   * Reverses TOON tokens back into a JSON AST Object.
   */
  const toonToJson = (toonStr) => {
    const tokens = toonStr.split('\n').map(t => t.trim()).filter(Boolean);
    let cursor = 0;

    const parseValue = () => {
      if (cursor >= tokens.length) throw new Error("Unexpected end of input");
      let token = tokens[cursor];
      
      if (token.startsWith('VALUE ')) {
        cursor++;
        // Handles proper JSON stringified primitives/null parsing
        return JSON.parse(token.substring(6).trim());
      } else if (token.startsWith('OBJECT_START')) {
        cursor++;
        return parseObject();
      } else if (token.startsWith('ARRAY_START')) {
        cursor++;
        return parseArray();
      } else {
        throw new Error(`Unexpected token at sequence bounds: ${token}`);
      }
    };

    const parseObject = () => {
      const obj = {};
      while (cursor < tokens.length) {
        let token = tokens[cursor];
        if (token === 'OBJECT_END') {
          cursor++;
          return obj;
        }
        
        if (!token.startsWith('KEY ')) {
          throw new Error(`Expected KEY but found: ${token}`);
        }
        
        const keyPartRaw = token.substring(4).trim();
        // Extract stringified key token matching exactly
        const match = keyPartRaw.match(/^"(?:[^"\\]|\\.)*"/);
        if (!match) throw new Error(`Invalid or missing explicit key token: ${token}`);
        
        const keyStr = match[0];
        const parsedKey = JSON.parse(keyStr);
        const remainder = keyPartRaw.substring(keyStr.length).trim();
        
        if (remainder.startsWith('VALUE ')) {
          const valPart = remainder.substring(6).trim();
          obj[parsedKey] = JSON.parse(valPart);
          cursor++;
        } else if (remainder === '') {
          cursor++;
          let nextToken = tokens[cursor];
          if (!nextToken) throw new Error("Unexpected end of input after attributing KEY");
          
          if (nextToken.startsWith('OBJECT_START')) {
            cursor++;
            obj[parsedKey] = parseObject();
          } else if (nextToken.startsWith('ARRAY_START')) {
            cursor++;
            obj[parsedKey] = parseArray();
          } else {
            throw new Error(`Syntax Error: Expected mapped structure but found ${nextToken}`);
          }
        } else {
          throw new Error(`Syntax Error: Invalid property bounds at ${token}`);
        }
      }
      throw new Error("Early termination: Missing OBJECT_END");
    };

    const parseArray = () => {
      const arr = [];
      while (cursor < tokens.length) {
        let token = tokens[cursor];
        if (token === 'ARRAY_END') {
          cursor++;
          return arr;
        }
        arr.push(parseValue());
      }
      throw new Error("Early termination: Missing ARRAY_END");
    };

    if (tokens.length === 0) return null;
    return parseValue();
  };

  const handleJsonToToon = () => {
    try {
      if (!jsonText.trim()) {
        setToonText('');
        return;
      }
      const parsed = JSON.parse(jsonText);
      const toon = jsonToTOON(parsed);
      setToonText(toon);
    } catch (e) {
      setToonText('Error parsing JSON -> TOON:\n' + e.message);
    }
  };

  const handleToonToJson = () => {
    try {
      if (!toonText.trim()) {
        setJsonText('');
        return;
      }
      const parsed = toonToJson(toonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setJsonText('Error parsing TOON -> JSON:\n' + e.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>JSON ⟷ TOON Converter</h1>
        <p>Bidirectional Abstract Syntax Tree parser defined by formal TOON constraints.</p>
      </div>

      <div className="textarea-container">
        <span className="textarea-label">JSON Input / Output</span>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='{ "key": "value" }'
        />
      </div>

      <div className="controls">
        <button onClick={handleJsonToToon}>JSON ↓ TOON</button>
        <button onClick={handleToonToJson}>TOON ↑ JSON</button>
      </div>

      <div className="textarea-container">
        <span className="textarea-label">TOON Tokens Input / Output</span>
        <textarea
          value={toonText}
          onChange={(e) => setToonText(e.target.value)}
          placeholder="OBJECT_START&#10;KEY &#34;key&#34; VALUE &#34;value&#34;&#10;OBJECT_END"
        />
      </div>
      <div className="footer">
        Prithwi singh
      </div>
    </div>
  );
}
