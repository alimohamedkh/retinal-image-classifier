import { IoIosMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Header({ handleToggleShow }: { handleToggleShow: () => void }) {
  return (
    <nav className="nav">
      <IoIosMenu className="nav__btn" onClick={handleToggleShow} />
      <CgProfile className="nav__btn" />
    </nav>
  );
}

export default Header;
