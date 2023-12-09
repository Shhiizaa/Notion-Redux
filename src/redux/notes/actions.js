export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/SET/LOADING" });
    const params = new URLSearchParams({
      authorId,
    }).toString();
    const notes = await fetch(`http://localhost:5001/notes?${params}`).then(
      (r) => r.json()
    );
    notes.sort((a, b) => b.createdAt - a.createdAt);
    dispatch({ type: "NOTES/SET", payload: notes });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err.toString() });
  }
};
export const deleteNote = (id, authorId) => async (dispatch) => {
  fetch(`http://localhost:5001/notes/${id}`, {
    method: "DELETE",
  });
  dispatch(getNotes(authorId));
};

export const newNote =
  ({ authorID, title, text }) =>
  async (dispatch) => {
    const note = {
      id: Date.now(),
      authorId: authorID,
      title: title,
      text: text,
      createdAt: Date.now(),
    };
    fetch("http://localhost:5001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    dispatch({ type: "NOTES/SET/NOW", payload: note });
  };

export const editNote =
  ({ note, title, text }) =>
  (dispatch) => {
    const newNote = {
      id: note.id,
      authorId: note.authorId,
      title: title,
      text: text,
      createdAt: note.createdAt,
    };
    fetch(`http://localhost:5001/notes/${note.id}`, {
      method: "DELETE",
    });
    fetch("http://localhost:5001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    dispatch({ type: "NOTES/SET/NOW", payload: newNote });
  };
