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
    <div className="app">
      <Header handleToggleShow={handleToggleShow} show={show} />
      {show && <SideDrawer handleToggleShow={handleToggleShow} />}

      <div className="main" style={show ? { filter: "blur(3px)" } : undefined}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
