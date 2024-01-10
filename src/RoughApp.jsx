import AuthLayout from "./pages/AuthLayout";

// eslint-disable-next-line react/prop-types
function RoughApp() {
  return (
    <AuthLayout>
      <div className=" lg:max-w-[88%] lg:mx-auto w-full px-8 py-4 flex gap-2 justify-center flex-wrap">
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </div>
    </AuthLayout>
  );
}

function Box() {
  return (
    <div className="rounded-md basis-[30%] h-fit p-3 bg-dark-variant-gray">
      <div className="img w-full mb-2">
        <img
          src="/public/assets/bg-image.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="title font-semibold text-white">Hello Evryqwn</div>
    </div>
  );
}

export default RoughApp;

//todo : - Rough pages

//todo : - Input field

//todo : - **Containers** lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8
/*



import { forwardRef, useId } from "react";

// eslint-disable-next-line react/prop-types
const Input = forwardRef(function Input(
  // eslint-disable-next-line react/prop-types
  { label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="md:flex md:gap-1 items-center my-2">
      {label && (
        <label
          className="shrink-0 grow-0 basis-[7rem]  md:text-xl text-base w-full "
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`focus:outline-none focus:ring-primary-pink-variant focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-primary-black rounded-lg w-full px-3 py-2 bg-dark-variant-gray text-white font-sans max-sm:text-base max-sm:mt-2 ${className}`}
        type="text"
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
*/
//todo : - Signup page
/*
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  function handleNavigateLogin() {
    navigate("login", { replace: true });
  }
  function handleSignUp(data) {
    console.log("In submit");

    console.log(data);
    reset();
  }
  return (
    <div className="fixed inset-0 w-screen min-h-screen flex items-center justify-center bg-black bg-opacity-70 ">
      <div className="border-2 px-8 py-12 rounded-lg border-black max-w-[500px]  w-full md:mx-auto  mx-4 space-y-5 text-primary-pink bg-dark-primary-black max-sm:px-6 max-sm:py-4">
        <header className="text-center">
          <div className="logo mx-auto">
            <img
              className="w-32 max-sm:w-20 max-sm:mb-3 mx-auto mb-8"
              src="/public/assets/react-logo-dark.png"
              alt="App Logo"
            />
          </div>
          <h1 className="text-2xl max-sm:text-xl font-bold ">
            Welcome to BlogWrite
          </h1>
          <p className="mt-1 max-sm:text-xs text-primary-pink-variant font-light">
            Sign-up to continue
          </p>
        </header>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="space-y-7"
          noValidate
        >
          <div>
            <Input
              {...register("username", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Username must have atleast 6 characters",
                },
              })}
              label={"Username"}
            />
            {errors.username && (
              <p className="md:w-[calc(100%-7rem-10px)] ml-auto text-xs text-primary-pink-variant font-extralight">
                {errors.username.message}
              </p>
            )}
          </div>
          <Input
            {...register("email", { required: true })}
            label={"Email"}
            type={"email"}
          />
          <Input
            {...register("password", { required: true })}
            label={"Password"}
            type={"password"}
          />
          <div className="btn-container flex ">
            <button
              className="mt-4 text-black bg-primary-pink-variant  hover:shadow-primary-pink/30 shadow-lg  border-2 border-black px-4 py-4 grow max-w-60 mx-auto rounded-2xl"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mb-0 max-sm:text-xs text-primary-pink-variant">
          Already got an account?{" "}
          <span
            className="font-semibold  underline italic cursor-pointer"
            onClick={handleNavigateLogin}
          >
            Login
           
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

*/

//todo : - Homepage

/*
import { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
function Homepage() {
  useEffect(() => {
    document.title = "Home";
    return () => (document.title = "React Blog");
  }, []);
  return (
    <div className=" w-full  bg-white">
      {/* <div className=" w-full  bg-dark-primary-black get-border py-8"> }
      <div className="relative lg:max-w-[88%] lg:mx-auto w-full mt-2 mb-2 h-[calc(100vh-300px)]  px-8 gap-8 ">
        <div className="relative z-[1] text-white 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-2xl py-10 pl-20 w-full h-full flex flex-col justify-between items-start gap-16  bg-gradient-to-r from-dark-primary-black to-dark-variant-gray/30 rounded-md ">
          <div>
            <span className=" whitespace-nowrap">
              <span className="text-primary-pink">React</span>ive Insights,
            </span>
            <br />
            <span className=" whitespace-nowrap">
              Proactive <span className="text-primary-pink">Blog</span>ging.
            </span>
            <br />
            <span className="lg:text-3xl md:text-xl max-md:text-base whitespace-nowrap text-primary-pink-variant">
              Welcome to React Blog
            </span>
          </div>
          <button className="text-black text-xl bg-primary-pink px-3 py-2 rounded-lg flex items-center gap-2 font-medium">
            Get Started <FaLongArrowAltRight size={20} />
          </button>
        </div>
        {/* <img src="../../public/assets/blog-svg.svg" alt="" /> }
        <img
          className="absolute top-0 right-12 w-3/4 h-full object-contain"
          src="../../public/assets/blog-svg.svg"
          alt="Background Image"
        />
      </div>
    </div>
  );
}

export default Homepage;


*/

/*
<div className=" w-full  bg-white">
      {<div className=" w-full  bg-dark-primary-black get-border py-8"> }
      <div className=" lg:max-w-[88%] lg:mx-auto w-full mt-10 2xl:py-8 px-8  flex flex-col items-start gap-8 border-black border-2 bg-[url('../../public/assets/blog-svg.svg')] bg-no-repeat bg-right bg-contain">
        <div className="text-primary-pink-variant 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-2xl border-2  2xl:py-10 ">
          <span className=" whitespace-nowrap">Reactive Insights,</span>
          <br />
          <span className=" whitespace-nowrap">Proactive Blogging.</span>
          <br />
          <span className="lg:text-3xl md:text-xl max-md:text-base whitespace-nowrap">
            Welcome to React Blog
          </span>
        </div>
        {/* <img src="../../public/assets/blog-svg.svg" alt="" />}
        <button className="text-primary-pink">Click</button>
      </div>
    </div>
*/
