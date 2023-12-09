import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectNow } from "../redux/notes/selectors";
import { editNote } from "../redux/notes/actions";

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const note = useSelector(selectNow);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [error, setError] = useState("");

  function handleSave() {
    if (!title.trim()) {
      setError("Имя заметки не должно быть пустым");
    } else {
      dispatch(editNote({ note, title, text }));
      navigate(`/notes/${note.id}`);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 md:p-8 text-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl md:text-4xl mb-8">Edit</h1>
        <input
          className="block w-full md:w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
          placeholder="Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <textarea
          className="w-full h-40 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
          placeholder="Note text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={() => handleSave()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
        >
          Save
        </button>
        <a href="/notes">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8">
            Back
          </button>
        </a>
      </div>
    </div>
  );
}
