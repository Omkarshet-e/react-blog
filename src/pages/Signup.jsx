import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FaTimesCircle } from "react-icons/fa";

import Input from "../components/Input";
import { Error, Loading } from "../components";
import auth from "../appwrite/auth";
import { LOGIN } from "../state/userSlice";

function Signup() {
  useEffect(() => {
    document.title = "Sign Up";
    return () => (document.title = "React Blog");
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { origin } = state ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  function handleNavigateLogin() {
    navigate("/login", { state: { origin: "signup" } });
  }
  function handleNavigateRoot(e) {
    if (e.target.id === "overlay") {
      const destination = origin === "login" ? "/" : -1;
      navigate(destination);
    }
  }
  const loginMutation = useMutation({
    mutationFn: (data) => {
      return auth.signIn(data);
    },
    onSuccess: (data) => {
      dispatch(LOGIN(data));
      const destination = origin === "login" ? "/blogs" : -1;
      navigate(destination);
    },
    onError: () => {
      navigate("/error", { state: { message: "Error Signing-In" } });
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data) => {
      return auth.signup(data);
    },
    onError: (error) => {
      if (
        error.message ===
        "A user with the same id, email, or phone already exists in this project."
      ) {
        navigate("/error", {
          state: { message: "User Already Exists" },
        });
        setTimeout(() => {
          {
            window.alert("User Already Exists");
          }
        }, 10);
      } else {
        navigate("/error", { state: { message: "Signup Error" } });
      }
    },
  });

  async function handleSignUp(data) {
    signupMutation.mutate(data, {
      onSuccess: () => {
        const { email, password } = data;
        loginMutation.mutate({ email, password });
      },
    });
  }

  if (signupMutation.isPending) {
    return <Loading />;
  }
  if (signupMutation.isError) {
    return <Error />;
  }

  return (
    <div
      className="relative inset-0 py-6 w-screen flex items-center justify-center bg-black bg-opacity-70 "
      onClick={handleNavigateRoot}
      id="overlay"
    >
      <div
        className="relative border-2 px-8 shadow-2xl shadow-black 2xl:py-12 sm:py-6 py-4 rounded-xl border-black max-w-[500px]  w-full md:mx-auto  mx-4 space-y-5 text-primary-pink bg-dark-primary-black max-sm:px-6 max-sm:py-4"
        id="modal"
      >
        <header className="text-center">
          <div className="logo mx-auto">
            <img
              className="w-32 max-sm:w-20 max-sm:mb-3 mx-auto mb-8"
              src="/assets/react-logo-dark.png"
              alt="App Logo"
            />
          </div>
          <h1 className="text-2xl max-sm:text-xl font-bold ">
            Welcome to React Blog
          </h1>
          <p className="mt-1 max-sm:text-xs text-primary-pink-variant font-light">
            Sign-up to continue
          </p>
        </header>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="space-y-5 max-lg:space-y-3 max-sm:space-y-2"
          noValidate
        >
          <div>
            <Input
              {...register("username", {
                required: "* This field is required ",
                minLength: {
                  value: 6,
                  message: "* Username must have atleast 6 characters",
                },
              })}
              label={"Username"}
              type={"text"}
            />
            {errors.username && (
              <p className="form-error">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("email", {
                required: "* This field is required ",
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
                required: "* This field is required ",
                minLength: {
                  value: 8,
                  message: "* Username must have atleast 8 characters",
                },
              })}
              label={"Password"}
              type={"text"}
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
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mb-0 max-sm:text-xs text-primary-pink-variant">
          Already got an account?{" "}
          <span
            className="font-semibold hover:text-primary-pink  underline italic cursor-pointer"
            onClick={handleNavigateLogin}
          >
            Login
            {/* <Link to={"login"}>Login</Link> */}
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

export default Signup;
