import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import toast from "react-hot-toast";

function SignupForm() {
  const [fullName, setFullName] = useState<string>("");
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
      { email, password, user_type: userType, full_name: fullName },
      { onSuccess: () => navigate("/login") }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <label htmlFor="fullName" className="form__label">
          What is your full name
        </label>
        <input
          type="fullName"
          name="fullName"
          id="fullName"
          className="form__input"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="form__container">
        <label htmlFor="email" className="form__label">
          Enter your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@example.com"
          className="form__input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form__container">
        <label htmlFor="password" className="form__label">
          Enter your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          className="form__input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form__container">
        <label htmlFor="confirmPassword" className="form__label">
          Confirm Your Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder=""
          className="form__input"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="form__container">
        <label htmlFor="confirmPassword" className="form__label">
          Are you a patient or a doctor ?
        </label>
        <select
          name="userType"
          id="userType"
          className="form__input"
          required
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Please choose an option</option>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div>

      <div className="form__buttons">
        <button type="submit" className="form__submit" disabled={isLoading}>
          Signup
        </button>
        <Link to="/login" className="form__redirect" aria-disabled={isLoading}>
          Go to Login
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
