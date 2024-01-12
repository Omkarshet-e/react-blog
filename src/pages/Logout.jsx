import { useDispatch, useSelector } from "react-redux";
import auth from "../appwrite/auth";
import { LOGOUT } from "../state/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isUser);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/error", { state: { message: "User not Logged-In" } });
    }
  }, [isLoggedIn, navigate]);

  async function handleLogout() {
    dispatch(LOGOUT());
    navigate("/");
    const activeSession = await auth.getUser();
    if (activeSession) {
      await auth.signOut();
    }
  }
  return (
    <div className="w-full flex justify-center items-center bg-black p-4">
      <div className="space-y-16 ">
        <h1 className="text-center text-6xl max-lg:text-5xl max-sm:text-3xl text-primary-pink">
          Are you sure you want to logout?
        </h1>
        <div className="flex justify-center gap-5 items-center w-60 mx-auto xl:text-2xl max-lg:text-xl max-sm:text-base">
          <button
            onClick={handleLogout}
            className="  font-semibold  px-3 py-2 rounded-lg w-30 text-center flex-1 text-primary-pink bg-dark-primary-black"
          >
            Yes
          </button>
          <Link
            to={-1}
            className="  font-semibold  px-3 py-2 rounded-lg w-30 text-center flex-1 bg-primary-pink"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
