import React from "react";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { selectNow } from "../redux/notes/selectors";
import { deleteNote } from "../redux/notes/actions";
function Note() {
  const dispatch = useDispatch();
  const note = useSelector(selectNow);
  if (JSON.stringify(note) === "{}") {
    return <ErrorPage></ErrorPage>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 md:p-8 text-center bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl">{note.title}</h1>
          <div className="flex items-center">
            <Link to={`/notes/edit`} className="mr-2">
              <span role="img" aria-label="edit">
                ✍️
              </span>
            </Link>
            <Link to={`/notes/`}>
              <span
                onClick={() => {
                  dispatch(deleteNote(note.id, note.authorId));
                }}
                role="img"
                aria-label="delete"
              >
                🗑️
              </span>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden overflow-y-auto whitespace-pre-line w-full h-40 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer">
          {note.text}
        </div>
        <a href="/notes">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8">
            Back
          </button>
        </a>
      </div>
    </div>
  );
}

export default React.memo(Note);
