import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.user.isUser);

  function handleToggleOpen() {
    setOpen((open) => !open);
  }

  function handleToggleOverlay(e) {
    if (e.target.id === "overlay" || e.target.id === "links-bg") {
      setOpen(false);
    }
  }
  useEffect(() => {
    if (open) {
      document.body.classList.add("max-sm:overflow-y-hidden");
    } else {
      document.body.classList.remove("max-sm:overflow-y-hidden");
    }
  }, [open]);

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
          id="overlay"
          onClick={handleToggleOverlay}
          className={`fixed inset-0 sm:hidden bg-dark-primary-black/40 z-10 ${
            open ? "" : "hidden"
          }`}
        ></div>
        <div
          id="links-bg"
          onClick={handleToggleOverlay}
          className={`${
            open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
          } sm:flex sm:items-center lg:gap-12 sm:gap-4 md:gap-6 xl:text-xl sm:text-base max-sm:fixed inset-0 max-sm:w-[80%] max-sm:ml-auto max-sm:bg-black max-sm:flex max-sm:flex-col max-sm:pt-2 max-sm:divide-y-2 max-sm:divide-white/30  max-sm:rounded-tl-xl max-sm:rounded-bl-xl max-sm:z-50 duration-150 ease-in-out `}
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
                    <Link to={"/logout"}>{item.item}</Link>
                  )}
                  {item.item !== "Logout" && (
                    <Link to={item.path}>{item.item}</Link>
                  )}
                </div>
              );
          })}
        </div>

        <div onClick={handleToggleOpen} className="toggle sm:hidden ">
          <div className={`${open ? "hidden" : ""}`}>
            <FaBars size={25} />
          </div>
          <div className={`z-50 ${!open ? "hidden" : "fixed top-6 right-2"}`}>
            <FaTimes size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
