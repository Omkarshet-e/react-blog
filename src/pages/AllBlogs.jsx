import { useEffect } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { Error, Loading } from "../components";
import db from "../appwrite/database";

function AllBlogs() {
  useEffect(() => {
    document.title = "All Blogs";
    return () => (document.title = "React Blog");
  }, []);

  const {
    isError,
    isLoading,
    data: blogList,
  } = useQuery({
    queryKey: ["blogList"],
    queryFn: getBlogsList,
  });

  async function getBlogsList() {
    const response = await db.getAllDocuments();
    console.log(response.documents);
    return response.documents;
  }

  if (isLoading) {
    console.log("Loading");
    return <Loading />;
  }

  if (isError) {
    console.log("Error");
    return <Error />;
  }

  return (
    <div className="w-full  bg-[#ff758f] min-h-[30vw] py-4 ">
      <div
        className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 h-full 
        grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 "
      >
        {blogList?.map((blogObj) => {
          console.log(blogObj);
          return (
            <BlogCard
              key={`${blogObj.$id} ${blogObj.$createdAt}`}
              $id={blogObj.$id}
              content={blogObj.content}
              title={blogObj.title}
              imageId={blogObj.imageId}
              userId={blogObj.userId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllBlogs;
