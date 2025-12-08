import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedUserAtom } from "../store/user";
import UserLinks from "./UserLinks";
import "./style.css";

function AddUser() {
  const history = useHistory();
  const [selectedUser] = useAtom(selectedUserAtom);
  let [state, setState] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const addNewUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email } = state;
    const res = await fetch("http://localhost:8000/api/addnewuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    setIsLoading(false);
    const data = await res.json();
    if (data.status == 200 || data.status == 201) {
      window.alert("User added successfully");
      history.push("/viewusers");
    } else {
      window.alert(data.message || data.error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email } = state;
    const res = await fetch(
      `http://localhost:8000/api/updateuser/${selectedUser?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );
    setIsLoading(false);
    const data = await res.json();
    if (data.status == 200 || data.status == 201) {
      window.alert("User updated successfully");
      history.push("/viewusers");
    } else {
      window.alert(data.message || data.error);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      setState({ email: selectedUser?.email, name: selectedUser?.name });
    }
  }, [selectedUser]);

  return (
    <div className="main">
      <header className="adduser_header">
        <UserLinks />
      </header>
      <div className="form">
        <form method="post">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onchange}
            value={state?.name}
            maxLength={30}
            minLength={3}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            onChange={onchange}
            value={state?.email}
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
            required
          />
          <button
            type="submit"
            onClick={selectedUser?._id ? updateUser : addNewUser}
            className="adduser_btn"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : selectedUser?._id ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
