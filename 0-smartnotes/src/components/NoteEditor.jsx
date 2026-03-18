import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDebounce } from "../hooks/useDebounce";
import { supabase } from "../supabaseClient";

const NoteEditor = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const debounceValue = useDebounce(input, 1000);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotes(data);
      if (data.length > 0 && !activeNoteId) {
        selectNote(data[0]);
      }
    }
    setIsLoading(false);
  };

  const createNote = async () => {
    const newNote = {
      user_id: user.id,
      title: "New Note",
      content: "",
    };

    const { data, error } = await supabase
      .from("notes")
      .insert([newNote])
      .select();

    if (!error && data && data.length > 0) {
      const insertedNote = data[0];
      setNotes([insertedNote, ...notes]);
      selectNote(insertedNote);
    } else {
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) {
      const updatedNotes = notes.filter((n) => n.id !== id);
      setNotes(updatedNotes);
      if (activeNoteId === id) {
        if (updatedNotes.length > 0) {
          selectNote(updatedNotes[0]);
        } else {
          setActiveNoteId(null);
          setInput("");
        }
      }
    } else {
      console.error("Error deleting note:", error);
    }
  };

  const selectNote = (note) => {
    setActiveNoteId(note.id);
    setInput(note.content || "");
  };

  // Auto-save
  useEffect(() => {
    if (activeNoteId !== null && debounceValue !== undefined) {
      const noteToUpdate = notes.find(n => n.id === activeNoteId);
      // Only generic update if content actually changed
      if (noteToUpdate && noteToUpdate.content !== debounceValue) {
        saveNote(activeNoteId, debounceValue);
      }
    }
  }, [debounceValue, activeNoteId]);

  const saveNote = async (id, content) => {
    // Basic title generation from first line of content
    const firstLine = content.split('\n')[0].trim();
    const title = firstLine ? (firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine) : "New Note";

    const { error } = await supabase
      .from("notes")
      .update({ content, title })
      .eq("id", id);

    if (!error) {
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? { ...n, content, title } : n))
      );
    } else {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#5f5f5f", color: "white", fontFamily: "sans-serif" }}>

      {/* Sidebar for Notes List */}
      <div style={{ width: "250px", borderRight: "1px solid rgba(255,255,255,0.2)", display: "flex", flexDirection: "column", backgroundColor: "#4a4a4a" }}>
        <div style={{ padding: "15px", borderBottom: "1px solid rgba(255,255,255,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Notes</h2>
          <button onClick={createNote} style={{ background: "transparent", color: "white", border: "1px solid white", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", fontSize: "18px" }}>+</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? <div style={{ padding: "15px" }}>Loading...</div> : notes.map(n => (
            <div 
              key={n.id} 
              onClick={() => selectNote(n)}
              style={{
                padding: "15px", 
                borderBottom: "1px solid rgba(255,255,255,0.1)", 
                cursor: "pointer",
                backgroundColor: activeNoteId === n.id ? "#6a6a6a" : "transparent"
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {n.title || "New Note"}
              </div>
              <div style={{ fontSize: "12px", color: "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {n.content || "Empty content"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 15px",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
             {/* Replace the Plus icon with Note title from old header context */}
             <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {notes.find(n => n.id === activeNoteId)?.title || "Select or create a note"}
             </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <p>{user?.user_metadata?.name || user?.email}</p>
            <button
              onClick={() => saveNote(activeNoteId, input)}
              disabled={!activeNoteId}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: activeNoteId ? "#4CAF50" : "#888",
                color: "white",
                cursor: activeNoteId ? "pointer" : "not-allowed",
              }}
            >
              Save
            </button>
            <button
              onClick={logout}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#e92700",
                color: "white",
                cursor: "pointer",
              }}
            >
              LOGOUT
            </button>
            <div 
              onClick={() => activeNoteId && deleteNote(activeNoteId)} 
              style={{ cursor: activeNoteId ? "pointer" : "not-allowed", color: activeNoteId ? "#ff4c4c" : "#888" }} 
              title="Delete Note"
            >
              X
            </div>
          </div>
        </header>

        <textarea
          placeholder={activeNoteId ? "Take a note..." : "Please select or create a note on the left."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!activeNoteId}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            padding: "20px",
            fontSize: "18px",
            color: "white",
          }}
        />
      </div>

    </div>
  );
};

export default NoteEditor;
