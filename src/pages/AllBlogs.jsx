import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import BlogCard from "../components/Blogs/BlogCard";
import { Loading } from "../components";
import db from "../appwrite/database";

function AllBlogs() {
  useEffect(() => {
    document.title = "All Blogs";
    return () => (document.title = "React Blog");
  }, []);

  const navigate = useNavigate();
  const { state } = useLocation();
  let { invalidate = false } = state || {};

  const queryClient = useQueryClient();

  const {
    isError,
    isLoading,
    data: blogList,
  } = useQuery({
    queryKey: ["blogList"],
    queryFn: getBlogsList,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (invalidate) {
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    }
  }, [queryClient, invalidate]);

  async function getBlogsList() {
    invalidate = false;
    const response = await db.getAllDocuments();
    return response.documents;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    navigate("/error", { state: { message: "Error fetching data" } });
  }

  return (
    <div className="w-full  bg-[#ff758f] min-h-[30vw] py-4 ">
      <div
        className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 h-full 
        grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 "
      >
        {blogList?.map((blogObj) => {
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
