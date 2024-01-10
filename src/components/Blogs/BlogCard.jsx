/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
function BlogCard({ content }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/blog/some-blog")}
      className="  py-3 px-2 bg-dark-primary-black max-sm:aspect-[10/10] aspect-[10/12] rounded-lg ease-in-out duration-200  flex flex-col justify-between gap-5"
    >
      <div>
        <div className="image w-full p-2">
          <img
            src="assets/bg-2.avif"
            alt="bg-image"
            className="w-full h-full object-cover border-2 rounded-lg"
          />
        </div>
        <div className="px-2  ">
          <div className="py-1 font-bold text-xl ">
            <h1 className="truncate tracking-widest text-primary-pink-variant">
              Titlejdbfsjhdfbsjdhfnbsdjfnbsdjfsnbdfjshdnfbsd
            </h1>
          </div>
          <div className="py-1 ">
            <p className="line-clamp-2 leading-5 text-base  font-medium text-primary-pink-variant/75">
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <button className="text-black font-bold mx-2  bg-primary-pink px-3 py-2 rounded-md flex items-center gap-3">
          Read More
          <FaLongArrowAltRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
