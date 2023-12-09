import React from "react";
import { useSelector } from "react-redux";
import { selectCreatedAt, selectUserEmail } from "../redux/user/selectors";

function About() {
  const email = useSelector(selectUserEmail);
  const date = new Date(useSelector(selectCreatedAt));
  return (
    <div className="p-4 md:p-8 text-center">
      <h1 className="text-2xl md:text-4xl mb-8">About me</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Data sign up:</strong> {date.getDate()}.{date.getMonth()}.
        {date.getFullYear()}
      </p>
      <a href="/notes">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8">
          Go to notes
        </button>
      </a>
    </div>
  );
}

export default React.memo(About);
