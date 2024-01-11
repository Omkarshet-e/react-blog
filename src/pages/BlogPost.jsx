import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { Loading } from "../components";

function BlogPost() {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
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
      <div className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 pt-6 ">
        <div className="img w-3/5 max-xl:w-4/5 mx-auto ">
          <img src={imgSrc} alt="" className="w-full h-full" />
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
