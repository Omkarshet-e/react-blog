/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FaLongArrowAltRight } from "react-icons/fa";

import storage from "../../appwrite/storage";
import Loading from "../Loading";
import Error from "../Error";

function BlogCard({ title, content, imageId, userId, $id }) {
  const navigate = useNavigate();

  const {
    data: imgSrc,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["imgSrc", imageId],
    queryFn: getImgSrc,
  });

  function getImgSrc() {
    const src = storage.getFilePreview(imageId);
    return src;
  }
  function handleBlogPost() {
    navigate(`/blog/${title}`, {
      state: { userId, title, content, img: JSON.stringify(imgSrc), $id },
    });
  }

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div
      onClick={handleBlogPost}
      className="  py-3 px-2 bg-dark-primary-black max-sm:aspect-[10/10] aspect-[10/12] rounded-lg ease-in-out duration-200  flex flex-col justify-between gap-5 hover:scale-[1.02] cursor-pointer"
    >
      <div>
        <div className="image w-full p-2 aspect-video">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover border-2 rounded-lg"
          />
        </div>
        <div className="px-2  ">
          <div className="py-1 font-bold text-xl ">
            <h1 className="truncate tracking-widest text-primary-pink-variant">
              {title}
            </h1>
          </div>
          <div className="py-1 ">
            <p className="line-clamp-2 leading-5 text-base  font-medium text-white/75">
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <button className="text-black font-bold mx-2  bg-primary-pink/80 hover:bg-primary-pink  px-3 py-2 rounded-md flex items-center gap-3">
          Read More
          <FaLongArrowAltRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
