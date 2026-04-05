const toonStr = `OBJECT_START
KEY "a" VALUE 1
KEY "b"
ARRAY_START "b"
VALUE 1
VALUE 2
ARRAY_END
KEY "c"
OBJECT_START
KEY "d" VALUE 3
OBJECT_END
OBJECT_END`;

const toonToJson = (toonStr) => {
    const tokens = toonStr.split('\n').map(t => t.trim()).filter(Boolean);
    let cursor = 0;

    const parseValue = () => {
      if (cursor >= tokens.length) throw new Error("Unexpected end of input");
      let token = tokens[cursor];
      
      if (token.startsWith('VALUE ')) {
        cursor++;
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

try {
  console.log(JSON.stringify(toonToJson(toonStr), null, 2));
} catch(e) {
  console.log("ERR: " + e.message);
  console.log(e.stack);
}
