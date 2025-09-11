import { IoIosMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import useLogout from "../features/auth/useLogout";

function Header({
  handleToggleShow,
  show,
}: {
  handleToggleShow: () => void;
  show: boolean;
}) {
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <nav
      className="header"
      style={show ? { filter: "blur(1.5px)" } : undefined}
    >
      <IoIosMenu className="header__btn" onClick={handleToggleShow} />

      <div className="header__btns">
        <CiUser className="header__btn" />
        <CiLogout className="header__btn" onClick={handleLogout} />
      </div>
    </nav>
  );
}

export default Header;
