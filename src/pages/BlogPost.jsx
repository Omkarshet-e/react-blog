import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import { Loading } from "../components";
import db from "../appwrite/database";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

function BlogPost() {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const { state } = useLocation();
  const { userId, title, content, img, $id } = state;

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    setLoading(true);
    setImgSrc(JSON.parse(img));
    setLoading(false);
  }, [img]);

  useEffect(() => {
    if (userData.userId === userId) {
      setOwner(true);
    }
  }, [userData, userId]);

  const mutation = useMutation({
    mutationFn: () => {
      return db.deleteDocument($id);
    },
    onSuccess: () => {
      console.log("Deleted");
      navigate("/blogs", { state: { invalidate: true } });
    },
    onError: () => {
      navigate("/error", {
        state: { message: "An error occurred while deleting" },
      });
    },
  });

  function handleDelete() {
    mutation.mutate();
  }

  useEffect(() => {
    document.title = title;
    return () => (document.title = "React Blog");
  }, [title]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full py-2">
      <div className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 pt-6 pb-10 ">
        <div
          className={`relative bg-dark-variant-gray rounded-lg img w-3/5 max-xl:w-4/5 mx-auto before:bg-black/25 before:absolute  before:inset-0 before:rounded-lg before: z-10 ${
            imgLoading ? "animate-pulse" : "before:hidden"
          }`}
        >
          <img
            src={imgSrc}
            loading="lazy"
            alt=""
            className={`w-full h-full rounded-lg border-2 border-dark-primary-black ${
              imgLoading ? "" : ""
            }`}
            onLoad={() => setImgLoading(false)}
            onError={() => {
              setImgLoading(false);
              setImgSrc("/assets/placeholder.png");
            }}
          />
        </div>
        <div className="w-4/5 mx-auto mt-8 divide-y-2 divide-white/40 break-words">
          <div className="p-2 text-2xl max-sm:text-xl  max-sm:-tracking-tighter tracking-wide font-bold capitalize">
            {title}
          </div>
          <div className="p-2 text-lg max-xl:text-base max-sm:text-sm font-medium">
            {parse(content)}
          </div>
        </div>
        <div className={`w-4/5 mx-auto text-right ${!owner ? "hidden" : ""}`}>
          <button
            onClick={handleDelete}
            className="my-5  text-xl max-xl:text-lg max-sm:text-base bg-dark-variant-gray text-primary-pink-variant px-3 py-2 rounded-lg sm:hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
