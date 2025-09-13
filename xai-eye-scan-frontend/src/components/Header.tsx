import { IoIosMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import useLogout from "../features/auth/useLogout";
import { useNavigate } from "react-router-dom";
import useGetUserDetails from "../features/user/useGetUserDetails";
import Loader from "./Loader";

function Header({
  handleToggleShow,
  show,
}: {
  handleToggleShow: () => void;
  show: boolean;
}) {
  const { data, isLoading } = useGetUserDetails();
  const { logout } = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  if (isLoading) return <Loader />;

  return (
    <nav
      className="header"
      style={show ? { filter: "blur(1.5px)" } : undefined}
    >
      <IoIosMenu className="header__btn" onClick={handleToggleShow} />

      <div className="header__profile">
        <img
          src="/default-user.jpg"
          alt="User image"
          className="header__profile--img"
        />
        <h2 className="header__profile--name">Adham El Samahy</h2>
      </div>

      <div className="header__btns">
        <CiUser className="header__btn" />
        <CiLogout className="header__btn" onClick={handleLogout} />
        <CiHome className="header__btn" onClick={() => navigate("/home")} />
      </div>
    </nav>
  );
}

export default Header;
