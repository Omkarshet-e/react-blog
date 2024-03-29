import { useLocation, useNavigate } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";

function Error() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-black w-full text-primary-pink">
      <div className=" w-full h-full flex flex-col items-center justify-center ">
        <div className=" flex flex-col items-center">
          <h1 className="h-fit w-fit  leading-none text-[10rem] font-bold tracking-wider max-sm:text-7xl">
            {(state?.message && "Error") || `404`}
          </h1>
          <p className="text-primary-pink-variant mb-4 mt-2 text-sm">
            {state?.message || `Page not found`}
          </p>
          <button
            className="bg-primary-pink text-black font-semibold w-fit h-fit flex items-center gap-3 px-5 py-2 rounded-xl"
            onClick={() => navigate("/")}
          >
            <FaLongArrowAltLeft size={20} /> Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
