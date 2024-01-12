import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { Loading } from "../components";

function BlogPost() {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const { state } = useLocation();
  const { userId, title, content, img, $id } = state;
  useEffect(() => {
    document.title = title;
    return () => (document.title = "React Blog");
  }, [title]);

  useEffect(() => {
    setLoading(true);
    setImgSrc(JSON.parse(img));
    setLoading(false);
  }, [img]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full py-2">
      <div className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 pt-6  ">
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
        <div className="w-4/5 mx-auto mt-8 divide-y-2 divide-white/40">
          <div className="p-2 text-2xl max-sm:text-xl  max-sm:-tracking-tighter tracking-wide font-bold capitalize">
            {title}
          </div>
          <div className="p-2 mb-8 text-lg max-xl:text-base max-sm:text-sm font-medium">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
