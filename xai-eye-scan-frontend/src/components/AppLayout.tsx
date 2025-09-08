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
      <Header handleToggleShow={handleToggleShow} />
      {show && <SideDrawer />}
      <Outlet />
    </div>
  );
}

export default AppLayout;
