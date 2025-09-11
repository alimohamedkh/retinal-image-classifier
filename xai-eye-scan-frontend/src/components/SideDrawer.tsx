import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

function SideDrawer({ handleToggleShow }: { handleToggleShow: () => void }) {
  return (
    <nav className="sidenav">
      <IoIosMenu className="sidenav__menu" onClick={handleToggleShow} />
      <div className="sidenav__btns">
        <Link to="/history" className="sidenav__btn" onClick={handleToggleShow}>
          History
        </Link>
        <Link to="/help" className="sidenav__btn" onClick={handleToggleShow}>
          Help
        </Link>
      </div>
    </nav>
  );
}

export default SideDrawer;
