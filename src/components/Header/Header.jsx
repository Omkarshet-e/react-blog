import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../appwrite/auth";
import { LOGOUT } from "../../state/userSlice";
function Header() {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.user.isUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleToggleOpen() {
    setOpen((open) => !open);
  }

  async function handleLogout() {
    dispatch(LOGOUT());
    const activeSession = await auth.getUser();
    if (activeSession) {
      const response = await auth.signOut();
      console.log("Logout response", response);
    }
    navigate("/");
  }
  const navItems = [
    {
      path: "/",
      item: "Home",
      status: true,
    },
    {
      path: "add-blog",
      item: "Add Blog",
      status: true,
    },
    {
      path: "blogs",
      item: "Blogs",
      status: true,
    },
    {
      path: "/signup",
      item: "Sign Up",
      status: !authStatus,
    },
    {
      path: "/login",
      item: "Login",
      status: !authStatus,
    },
    {
      item: "Logout",
      status: authStatus,
    },
  ];

  return (
    <div className="bg-dark-primary-black py-2 shadow-xl ">
      <div className=" flex items-center justify-between  text-primary-pink lg:max-w-[88%] lg:mx-auto w-full px-8 ">
        <Link to={"/"}>
          <div className="logo xl:w-16 md:w-12 w-9 flex items-center cursor-pointer">
            <img src="/assets/react-logo-dark.png" alt="" />
            <h1 className="whitespace-nowrap ml-4 max-md:ml-2 lg:text-3xl max-md:text-base text-xl ">
              React Blog
            </h1>
          </div>
        </Link>
        <div
          className={`${
            open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
          } sm:flex sm:items-center lg:gap-12 sm:gap-4 md:gap-6 xl:text-xl sm:text-base max-sm:fixed top-0 right-0 max-sm:h-full max-sm:w-2/3 max-sm:bg-black max-sm:flex max-sm:flex-col max-sm:pt-2 max-sm:divide-y-2 max-sm:divide-white/30  max-sm:rounded-tl-xl max-sm:rounded-bl-xl max-sm:z-10 duration-150 ease-in-out `}
        >
          <div className="text-center py-4 sm:hidden">React Blog</div>
          {navItems.map((item) => {
            if (item.status)
              return (
                <div
                  className={`list-none cursor-pointer max-sm:pl-[15%] max-sm:font-light max-sm:text-sm md:text-base xl:text-xl max-sm:py-4 ${
                    item.item === "Sign Up"
                      ? "  sm:text-black sm:p-2 sm:px-3 sm:font-semibold  sm:rounded-md sm:bg-primary-pink/80 sm:hover:text-black sm:hover:bg-primary-pink"
                      : ""
                  }
                   ${
                     item.item === "Login" || item.item === "Logout"
                       ? "sm:bg-primary-pink/80 sm:text-black sm:font-semibold sm:p-2 sm:px-3 sm:rounded-md sm:hover:bg-primary-pink sm:hover:text-black "
                       : ""
                   }`}
                  key={(item.path, item.item)}
                  onClick={handleToggleOpen}
                >
                  {item.item === "Logout" && (
                    <button onClick={handleLogout}>{item.item}</button>
                  )}
                  {item.item !== "Logout" && (
                    <Link to={item.path}>{item.item}</Link>
                  )}
                </div>
              );
          })}
          {/* {authStatus && (
            <button
              className="list-none cursor-pointer max-sm:pl-[15%] max-sm:font-light max-sm:text-sm md:text-base  max-sm:py-4 xl:text-xl  sm:bg-primary-pink/80 sm:text-black sm:font-semibold sm:p-2 sm:px-3 sm:rounded-md hover:bg-primary-pink sm:hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          )} */}
        </div>
        <div onClick={handleToggleOpen} className="toggle sm:hidden ">
          <div className={`${open ? "hidden" : ""}`}>
            <FaBars size={25} />
          </div>
          <div
            className={`z-10 ${!open ? "hidden" : "absolute top-6 right-2"}`}
          >
            <FaTimes size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
