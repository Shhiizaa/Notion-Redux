import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { newNote } from "../redux/notes/actions";

function New() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorID = useSelector(selectUserId);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const handleCreate = useCallback(() => {
    if (!title.trim()) {
      setError("Имя заметки не должно быть пустым");
    } else {
      dispatch(newNote({ authorID, title, text })).then(() =>
        navigate(`/notes/{id}`)
      );
    }
  }, [title, text]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 md:p-8 text-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl md:text-4xl mb-8">Create new note</h1>
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
          onClick={() => handleCreate(title, text)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
        >
          Create
        </button>
        <a href="/notes">
          <button
            onClick={() => localStorage.setItem("noteId", 0)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
          >
            Back
          </button>
        </a>
      </div>
    </div>
  );
}

export default React.memo(New);
