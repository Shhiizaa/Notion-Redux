import { User } from "../../validation";

export const getUser =
  ({ email, password }) =>
  async (dispatch) => {
    User.parse({ email, password, date: Date.now() });

    const query = new URLSearchParams({
      email,
      password,
    }).toString();

    try {
      const response = await fetch(`http://localhost:5001/users?${query}`);
      const users = await response.json();
      const user = users[0];

      if (user) {
        dispatch({ type: "USER/SET", payload: user });
      } else {
        throw new Error("Пользователь не найден");
      }
    } catch (error) {
      throw error;
    }
  };

export const newUser =
  ({ email, password }) =>
  (dispatch) => {
    const newUser = {
      id: Date.now(),
      email,
      password,
      createdAt: Date.now(),
    };
    fetch("http://localhost:5001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((r) => r.json());
    dispatch({ type: "USER/SET", payload: newUser });
  };
