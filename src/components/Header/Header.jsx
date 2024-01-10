import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  const [open, setOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  function handleToggleOpen() {
    setOpen(!open);
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
      path: "/logout",
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
                  className={`list-none cursor-pointer max-sm:pl-[15%] max-sm:font-light max-sm:text-sm md:text-base  max-sm:py-4 ${
                    item.item === "Sign Up"
                      ? "sm:border-2 sm:border-primary-pink sm:text-primary-pink sm:font-semibold sm:p-[calc(0.5rem-2px)] sm:rounded-md sm:hover:bg-primary-pink sm:hover:text-black"
                      : ""
                  }
                   ${
                     item.item === "Login" || item.item === "Logout"
                       ? "sm:bg-primary-pink sm:text-black sm:font-semibold sm:p-2 sm:px-3 sm:rounded-md sm:hover:bg-primary-pink-variant sm:hover:text-black "
                       : ""
                   }`}
                  key={(item.path, item.item)}
                  onClick={handleToggleOpen}
                >
                  <Link to={item.path}>{item.item}</Link>
                </div>
              );
          })}
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
