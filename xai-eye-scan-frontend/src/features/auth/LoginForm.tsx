function LoginForm() {
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
    </form>
  );
}

export default LoginForm;
