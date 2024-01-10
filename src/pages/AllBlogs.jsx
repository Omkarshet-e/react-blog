import { useEffect } from "react";
import BlogCard from "../components/Blogs/BlogCard";

function AllBlogs() {
  useEffect(() => {
    document.title = "All Blogs";
    return () => (document.title = "React Blog");
  }, []);
  return (
    <div className="w-full  bg-[#ff758f] min-h-[30vw] py-4 ">
      <div
        className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 h-full 
        grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 "
      >
        <BlogCard content={"whjnbfn "} />
      </div>
    </div>
  );
}

export default AllBlogs;
