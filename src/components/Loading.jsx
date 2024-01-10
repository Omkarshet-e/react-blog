import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    let handler;
    async function wait() {
      handler = setTimeout(() => {
        navigate("/error", { replace: true });
      }, 12 * 1000);
    }
    wait();
    return () => clearTimeout(handler);
  }, [navigate]);
  return (
    // <div className="fixed inset-0 flex w-screen justify-center h-screen bg-black bg-opacity-50 items-center">
    <div className=" bg-black flex justify-center items-center w-full ">
      <svg className="animate-spin md:h-12 md:w-12 h-6 w-6  md:mr-5 mr-2  rounded-full  text-white md:border-4 border-2 border-t-primary-pink border-x-primary-pink" />

      <h1 className="text-white 2xl:font-semibold font-medium md:text-5xl text-2xl max-sm:text-xl">
        Loading ...
      </h1>
    </div>
  );
}

export default Loading;
