import { IoIosMenu } from "react-icons/io";

function SideDrawer({ handleToggleShow }: { handleToggleShow: () => void }) {
  return (
    <nav className="sidenav">
      <IoIosMenu className="sidenav__menu" onClick={handleToggleShow} />
      <div className="sidenav__btns">
        <button className="sidenav__btn">History</button>
        <button className="sidenav__btn">Help</button>
      </div>
    </nav>
  );
}

export default SideDrawer;
