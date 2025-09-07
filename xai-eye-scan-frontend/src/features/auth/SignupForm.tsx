import { Link } from "react-router-dom";

function SignupForm() {
  return (
    <form className="login__form">
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
        />
      </div>

      <div className="login__form--buttons">
        <button type="submit" className="login__form--submit">
          Login
        </button>
        <Link to="/signup" className="login__form--redirect">
          Signup
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
