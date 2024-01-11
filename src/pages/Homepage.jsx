import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";

import auth from "../appwrite/auth";
import { LOGIN } from "../state/userSlice";

function Homepage() {
  useEffect(() => {
    document.title = "Home";
    return () => (document.title = "React Blog");
  }, []);

  const authStatus = useSelector((state) => state.user.isUser);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (authStatus) {
        if (!userData) {
          console.log("In undefined");
          const getUserData = await auth.getUser();
          console.log(getUserData);
          if (getUserData) {
            dispatch(LOGIN(getUserData));
            console.log("dispatch login");
          } else {
            navigate("/error", { state: { message: "You are not Logged-In" } });
          }
        } else {
          return;
        }
      }
    }
    checkUser();
  }, [authStatus, userData, navigate, dispatch]);

  function handleNavigate() {}
  return (
    <div className=" w-full  bg-white">
      <div className="relative lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full h-full max-lg:px-8 max-lg:gap-8 md:py-8 max-md:py-20">
        <div className="relative h-full">
          <div className="relative z-[1] text-white 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl py-10  xl:pl-20 md:pl-14 max-md:pl-8 w-full h-full flex flex-col xl:justify-between  max-xl:justify-center items-start xl:gap-16 sm:gap-28 max-sm:gap-32 bg-gradient-to-r from-dark-primary-black to-dark-variant-gray/30 rounded-xl max-md:rounded-md">
            <div>
              <span className=" whitespace-nowrap">
                <span className="text-primary-pink">React</span>ive Insights,
              </span>
              <br />
              <span className=" whitespace-nowrap">
                Proactive <span className="text-primary-pink">Blog</span>ging.
              </span>
              <br />
              <span className="lg:text-3xl md:text-xl max-md:text-base whitespace-nowrap text-[#ff758f]">
                Welcome to React Blog
              </span>
            </div>
            <Link
              to={"blogs"}
              className="text-black text-xl max-md:text-base bg-primary-pink/80 hover:bg-primary-pink  px-3 py-2 rounded-xl flex items-center gap-3 font-semibold"
              onClick={handleNavigate}
            >
              Get Started <FaLongArrowAltRight size={20} />
            </Link>
          </div>
          <img
            className="absolute top-0 right-12 w-3/4 h-full object-contain"
            src="/assets/blog-svg.svg"
            alt="Background Image"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
