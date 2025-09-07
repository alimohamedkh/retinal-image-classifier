import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import toast from "react-hot-toast";

function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword)
      toast.error(
        "The Password and the Password Confirm must have the same value"
      );

    signup(
      { email, password, user_type: userType },
      { onSuccess: () => navigate("/login") }
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

      <div className="login__form--container">
        <label htmlFor="confirmPassword" className="login__form--label">
          Confirm Your Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder=""
          className="login__form--input"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="login__form--container">
        <label htmlFor="confirmPassword" className="login__form--label">
          Are you a patient or a doctor ?
        </label>
        <select
          name="userType"
          id="userType"
          className="login__form--input"
          required
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Please choose an option</option>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div>

      <div className="login__form--buttons">
        <button
          type="submit"
          className="login__form--submit"
          disabled={isLoading}
        >
          Signup
        </button>
        <Link
          to="/login"
          className="login__form--redirect"
          aria-disabled={isLoading}
        >
          Go to Login
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
