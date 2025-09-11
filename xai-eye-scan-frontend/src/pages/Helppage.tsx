function Helppage() {
  return (
    <div className="help">
      <h1 className="help__title">How it works</h1>

      {/* <img src="/logo.png" alt="" /> */}

      <ul className="help__steps">
        <li className="help__step">
          step 1 : <span>click on button upload scan</span>
        </li>
        <li className="help__step">
          step 2 : <span>select the image from your device</span>
        </li>
        <li className="help__step">
          step 3 :{" "}
          <span>
            submit and will get in return the classification and heatmap
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Helppage;
