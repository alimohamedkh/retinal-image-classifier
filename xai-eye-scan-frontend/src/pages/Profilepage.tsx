import { useRef, useState } from "react";
import useUpdateCurrentUser from "../features/auth/useUpdateCurrentUser";
import useGetUserDetails from "../features/user/useGetUserDetails";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Profilepage() {
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userDetails, isLoading: isGettingUserDetails } =
    useGetUserDetails();
  const { updateCurrentUser, isLoading: isUpdatingUser } =
    useUpdateCurrentUser();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) setAvatar(e.target.files[0]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!fullName && !password && !confirmPassword && !avatar)
      toast.error("Please provide a value for one of the fields to update");

    if (password && !confirmPassword)
      toast.error("Please Confirm Your Password");

    if (confirmPassword && !password)
      toast.error("Please provide a value for your password");

    if (password && confirmPassword && password !== confirmPassword)
      toast.error("Password and Password Confirm need to be identical");

    updateCurrentUser({ avatar, fullName, password });
  }

  if (isGettingUserDetails) return <Loader />;

  return (
    <div className="profile">
      <h1 className="profile__title">Update Your Profile</h1>
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__container">
            <label htmlFor="email" className="form__label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form__input"
              disabled
              value={userDetails?.at(0).email}
            />
          </div>

          <div className="form__container">
            <label htmlFor="fullName" className="form__label">
              Full Name
            </label>
            <input
              type="fullName"
              name="fullName"
              id="fullName"
              className="form__input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form__container">
            <label htmlFor="password" className="form__label">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__container">
            <label htmlFor="confirmPassword" className="form__label">
              Confirm Your Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form__container">
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              hidden
              onChange={handleImageUpload}
            />

            <div className="form__upload">
              <label
                htmlFor="image"
                className={
                  isUpdatingUser
                    ? "form__upload--label form__label--disabled"
                    : "form__upload--label"
                }
              >
                Upload File
              </label>

              <span
                id="file-chosen"
                className="form__file"
                aria-disabled={isUpdatingUser}
              >
                {avatar ? avatar.name : "No file chosen"}
              </span>
            </div>

            <div className="form__buttons">
              <button
                type="submit"
                className="form__submit"
                disabled={isUpdatingUser}
              >
                Update Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profilepage;
