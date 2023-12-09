import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./routes/Login";
import Home from "./routes/Home";
import New from "./routes/New";
import Edit from "./routes/Edit";
import Note from "./routes/Note";
import About from "./routes/About";
import SignUp from "./routes/SignUp";
import ErrorPage from "./routes/ErrorPage";
import Notes from "./routes/Notes";
import store, { persistor } from "./redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      { path: "/", element: <About /> },
      { path: "/notes", element: <Notes /> },
      { path: "/notes/new", element: <New /> },
      { path: "/notes/edit", element: <Edit /> },
      { path: "/notes/:id", element: <Note /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
