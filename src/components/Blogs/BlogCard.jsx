/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FaLongArrowAltRight } from "react-icons/fa";
import parse from "html-react-parser";

import storage from "../../appwrite/storage";
import Loading from "../Loading";
import Error from "../Error";
import { useState } from "react";

function BlogCard({ title, content, imageId, userId, $id }) {
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);

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
    return src.href;
  }
  function handleBlogPost() {
    navigate(`/blog/${$id}`, {
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
      className="  py-3 px-2 bg-dark-primary-black aspect-[10/6] rounded-lg ease-in-out duration-200  flex flex-col justify-between gap-5 hover:scale-[1.02] cursor-pointer  "
    >
      <div>
        <div
          className={`relative image w-full p-2 aspect-video text-white/70 overflow-hidden  
          before:bg-white/20 before:absolute  before:inset-0 before:m-2 before:rounded-lg ${
            imgLoading ? "animate-pulse" : "before:hidden"
          }`}
        >
          <img
            src={imgSrc}
            alt={title}
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
            className={`w-full h-full object-cover border-2 rounded-lg ${
              imgLoading ? "hidden" : ""
            }`}
          />
        </div>
        <div className="px-2  ">
          <div className="py-1 font-bold text-xl ">
            <h1 className="truncate tracking-widest text-primary-pink-variant">
              {title}
            </h1>
          </div>
          <div className="py-1 ">
            <div className="line-clamp-2 text-base h-[3rem] font-medium text-white/75">
              {parse(content)}
            </div>
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
