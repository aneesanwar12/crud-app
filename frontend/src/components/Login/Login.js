import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Wrapper } from "../../commonStyles";
import { Form } from "../../commonStyles";

export const Login = () => {
  const history = useHistory();
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = state;
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setIsLoading(false);
    const data = await res.json();
    if (res.status === 401) {
      window.alert(data.message || data.error);
    } else {
      localStorage.setItem("token", data.token);
      history.push("/viewproducts");
    }
  };

  return (
    <Wrapper>
      <div className="form">
        <Form method="post">
          <label htmlFor="name">Email:</label>
          <input
            name="email"
            id="email"
            onChange={onchange}
            value={state?.email}
            type="email"
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            id="password"
            onChange={onchange}
            value={state?.password}
            type="password"
            required
          />
          <button
            type="submit"
            onClick={login}
            className="addproduct_btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};
