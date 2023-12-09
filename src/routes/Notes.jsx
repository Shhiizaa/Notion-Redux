import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import {
  selectNotes,
  selectNotesError,
  selectNotesLoading,
} from "../redux/notes/selectors";
import { deleteNote, getNotes } from "../redux/notes/actions";

function Notes({ authorId, notes, loading, error, dispatch }) {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotes(authorId));
  }, [dispatch, authorId]);

  if (loading) {
    return <div className="text-red-500">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="p-4 md:p-8 text-center">
        <Link to="/notes/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8">
            Add new note
          </button>
        </Link>
      </div>
      {notes?.map((note) => {
        const date = new Date(note.createdAt);
        return (
          <div
            key={note.id}
            className="flex items-center border p-3 my-2 mx-3 relative"
          >
            <Link
              onClick={() => dispatch({ type: "NOTES/SET/NOW", payload: note })}
              to={`/notes/${note.id}`}
              className="flex-1"
            >
              <span className="font-bold mr-2">{note.title}</span>
              <span className="text-sm text-gray-500">
                {date.getDay()}.{date.getMonth()}.{date.getFullYear()}
              </span>
            </Link>
            <div className="absolute top-1 right-1 flex">
              <Link to={`/notes/edit`} className="flex-1">
                <span
                  onClick={() =>
                    dispatch({ type: "NOTES/SET/NOW", payload: note })
                  }
                  role="img"
                  aria-label="edit"
                  className="mr-2"
                >
                  ✍️
                </span>
              </Link>
              <span
                onClick={() => {
                  dispatch(deleteNote(note.id, authorId)).then(() =>
                    navigate("/notes")
                  );
                }}
                role="img"
                aria-label="delete"
              >
                🗑️
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authorId: selectUserId(state),
  notes: selectNotes(state),
  loading: selectNotesLoading(state),
  error: selectNotesError(state),
});

export default connect(mapStateToProps)(React.memo(Notes));
