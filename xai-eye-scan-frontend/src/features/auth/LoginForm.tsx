import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
        onSuccess: () => {
          console.log("Logged In");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__form--container">
        <label htmlFor="email" className="login__form--label">
          Enter your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@example.com"
          className="login__form--input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="login__form--container">
        <label htmlFor="password" className="login__form--label">
          Enter your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          className="login__form--input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="login__form--buttons">
        <button
          type="submit"
          className="login__form--submit"
          disabled={isLoading}
        >
          Login
        </button>
        <Link
          to="/signup"
          className="login__form--redirect"
          aria-disabled={isLoading}
        >
          Signup
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
