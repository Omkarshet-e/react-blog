import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { Error, Loading } from "../components";
import db from "../appwrite/database";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import storage from "../appwrite/storage";

function BlogPost() {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const { state } = useLocation();
  const params = useParams();
  const {
    userId = null,
    title = null,
    content = null,
    img = null,
    $id = null,
  } = state || {};

  const initialState = { userId, title, content, img, $id };

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    setLoading(true);
    setImgSrc(JSON.parse(img));
    setLoading(false);
  }, [img]);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["getBlog"],
    queryFn: getBlogPost,
    enabled: $id ? false : true,
    initialData: initialState,
  });
  const imageId = data?.imageId;
  const { data: imgQuery } = useQuery({
    queryKey: ["imgSrc", imageId],
    queryFn: getImgSrc,
  });

  function getImgSrc() {
    const src = storage.getFilePreview(imageId);
    return src.href;
  }
  async function getBlogPost() {
    return await db.getDocument(params.id);
  }

  const mutation = useMutation({
    mutationFn: () => {
      return db.deleteDocument($id);
    },
    onSuccess: () => {
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
    document.title = title ?? data?.title ?? "React Blog";
    return () => (document.title = "React Blog");
  }, [title, data]);

  useEffect(() => {
    if (userData.userId === userId || userData.userId === data?.userId) {
      setOwner(true);
    }
  }, [userData, userId, data]);

  if (loading) {
    return <Loading />;
  }
  if (isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
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
            src={imgSrc ?? imgQuery}
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
            {title ?? data?.title}
          </div>
          <div className="p-2 text-lg max-xl:text-base max-sm:text-sm font-medium">
            {parse(content ?? data?.content ?? "")}
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
