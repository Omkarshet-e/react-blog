import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });
  function handleNavigateLogin() {
    navigate("/signup");
  }
  function handleNavigateRoot(e) {
    if (e.target.id === "overlay") {
      navigate("/");
    }
  }
  function handleSignIn(data) {
    //todo : - handle sign in and navigate
    console.log(data);
    document.activeElement.blur();
    reset();
  }

  useEffect(() => {
    document.title = "Login";
    return () => (document.title = "React Blog");
  }, []);
  return (
    <div
      className="fixed inset-0 overflow-y-scroll py-8 w-screen min-h-screen flex items-center justify-center bg-black bg-opacity-40  "
      onClick={handleNavigateRoot}
      id="overlay"
    >
      <div className="relative  border-2 px-8 py-12 rounded-xl mt-10 border-black max-w-[500px]  w-full md:mx-auto  mx-4 space-y-5 text-primary-pink bg-dark-primary-black max-sm:px-6 max-sm:py-4">
        <header className="text-center">
          <div className="logo mx-auto">
            <img
              className="w-32 max-sm:w-20 max-sm:mb-3 mx-auto mb-8"
              src="/assets/react-logo-dark.png"
              alt="App Logo"
            />
            {/* <h1>BlogWrite</h1> */}
          </div>
          <h1 className="text-2xl max-sm:text-xl font-bold ">
            Welcome to React Blog
          </h1>
          <p className="mt-1 max-sm:text-xs text-primary-pink-variant font-light">
            Login to continue
          </p>
        </header>
        <form
          className="space-y-5 max-lg:space-y-3 max-sm:space-y-2"
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div>
            <Input
              {...register("email", {
                required: "* This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "* Invalid email address",
                },
              })}
              label={"Email"}
              type={"email"}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("password", {
                required: "* This field is required",
                minLength: {
                  value: 8,
                  message: "* Password must have atleast 8 characters",
                },
              })}
              label={"Password"}
              type={"password"}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          <div className="btn-container flex ">
            <button
              className="mt-4 text-black bg-primary-pink-variant hover:bg-primary-pink  border-2 border-black px-4 py-4 grow max-w-60 mx-auto rounded-2xl"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mb-0 max-sm:text-xs text-primary-pink-variant">
          Dont have an account?{" "}
          <span
            className="font-semibold underline italic cursor-pointer hover:text-primary-pink "
            onClick={handleNavigateLogin}
          >
            Sign-up
            {/* <Link to={"/"}>Signup</Link> */}
          </span>
        </p>
        <div className="absolute -top-8 -right-3 bg-black rounded-full">
          <Link to={"/"}>
            <FaTimesCircle size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
