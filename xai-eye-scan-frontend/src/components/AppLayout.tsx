import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import SideDrawer from "./SideDrawer";

function AppLayout() {
  const [show, setShow] = useState<boolean>(false);

  function handleToggleShow() {
    console.log("Toggle");
    setShow((show) => !show);
  }

  return (
    <div
      className="app"
      // style={show ? { opacity: 0.97, filter: "blur(4px)" } : undefined}
    >
      <Header handleToggleShow={handleToggleShow} />
      {show && <SideDrawer handleToggleShow={handleToggleShow} />}

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
