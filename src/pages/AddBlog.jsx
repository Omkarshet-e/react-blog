import { useEffect, useState } from "react";
import ImageUpload from "../components/New Blog/ImageUpload";
import BlogData from "../components/New Blog/BlogData";

function AddBlog() {
  const [imageFileData, setImageFileData] = useState({});

  useEffect(() => {
    console.log(imageFileData);
  }, [imageFileData]);

  return (
    <div className="w-full  min-h-[90vh] bg-[#ff758f]   border-black border-4">
      <div className="h-full lg:max-w-[calc(88%-4rem)] lg:mx-auto max-lg:px-8   flex max-xl:flex-col-reverse  gap-2 max-md:py-10">
        <ImageUpload setImageFileData={setImageFileData} />
        <BlogData />
      </div>
    </div>
  );
}

export default AddBlog;
