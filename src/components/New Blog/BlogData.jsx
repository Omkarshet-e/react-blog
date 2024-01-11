import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import db from "../../appwrite/database";
import { useSelector } from "react-redux";
import storage from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";
/* eslint-disable react/prop-types */

function BlogData({ imageFileData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });
  const userId = useSelector((state) => state.user.userData.userId);
  const navigate = useNavigate();

  const blogMutation = useMutation({
    mutationFn: (data) => {
      return db.createDocument({ ...data, userId });
    },
    onSuccess: (data) => {
      navigate("/blogs");
    },
    onError: (error) => {
      console.log(error);
      navigate("/error", {
        state: {
          message:
            "An error occurred while uploading the blog. Try again later",
        },
      });
    },
  });

  const imageFileMutation = useMutation({
    mutationFn: (file) => {
      return storage.createFile(file);
    },
    onError: (error) => {
      console.log(error);
      navigate("/error", {
        state: {
          message:
            "An error occurred while uploading the blog. Try again later",
        },
      });
    },
  });

  function submitBlog(data) {
    if (imageFileData) {
      imageFileMutation.mutate(imageFileData, {
        onSuccess: (imageData) => {
          const imageId = imageData.$id;
          blogMutation.mutate({ ...data, imageId });
        },
      });
    } else {
      alert("Upload a image to continue");
      //todo upload image alert
    }
  }

  const isLoading = blogMutation.isLoading || imageFileMutation.isLoading;
  const isError = blogMutation.isError || imageFileMutation.isError;

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className="flex-1 flex flex-col items-center p-2  gap-0 justify-start h-fit ">
      <form onSubmit={handleSubmit(submitBlog)} className="w-full">
        <div className={`title w-full flex flex-col items-start `}>
          <label
            className={`font-medium text-xl max-sm:text-base ${
              errors.title ? "mb-0" : "mb-1"
            } `}
          >
            Blog Title
          </label>
          {errors.title && (
            <span className="text-sm text-red-600 font-bold mb-1">
              {errors.title.message}
            </span>
          )}
          <input
            {...register("title", { required: "* Title required" })}
            type="text"
            className=" focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-dark-primary-black rounded-lg w-full px-3 py-2 mb-2
         bg-dark-variant-gray text-white font-sans"
          />
        </div>
        <div className="relative content w-full aspect-[16/8] flex flex-col items-start">
          <label
            className={`font-medium text-xl max-sm:text-base ${
              errors.content ? "mb-0" : "mb-1"
            }`}
          >
            Content
          </label>
          {errors.content && (
            <span className="text-sm text-red-600 font-bold mb-1">
              {errors.content.message}
            </span>
          )}
          <textarea
            {...register("content", { required: "* Content required" })}
            name="content"
            id=""
            className="h-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-dark-primary-black rounded-lg w-full px-3 py-2 bg-dark-variant-gray text-white font-sans resize-none "
          ></textarea>

          <button
            type="submit"
            className=" mt-8 px-8 py-3 max-sm:px-6 max-sm:py-2 max-sm:rounded-lg 
            bg-primary-pink/70 hover:bg-primary-pink hover:scale-[1.02] rounded-2xl border-2 border-black font-semibold max-sm:text-sm "
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogData;
