import { useEffect, useState } from "react";
import ImageUpload from "../components/New Blog/ImageUpload";
import BlogData from "../components/New Blog/BlogData";

function AddBlog() {
  const [imageFileData, setImageFileData] = useState(null);

  useEffect(() => {
    document.title = "New Blog";
    return () => (document.title = "React Blog");
  }, []);

  return (
    <div className="w-full  bg-[#ff758f] min-h-[30vw] pt-8 pb-4 ">
      <div className="h-full xl:max-w-[calc(88%-4rem)] lg:max-w-[calc(97%)] lg:mx-auto max-lg:px-8 flex max-lg:flex-col  gap-5 lg:gap-2">
        <ImageUpload setImageFileData={setImageFileData} />
        <BlogData imageFileData={imageFileData} />
      </div>
    </div>
  );
}

export default AddBlog;
