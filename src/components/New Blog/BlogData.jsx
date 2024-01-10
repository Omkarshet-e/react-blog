function BlogData() {
  return (
    <div className="flex-1 flex flex-col items-center p-2 border-2 gap-2 justify-center ">
      <form className="w-full">
        <div className="title w-full">
          <input type="text" />
        </div>
        <div className="content w-full aspect-video border-2">
          <textarea
            name="content"
            id=""
            className="w-full h-full bg-dark-variant-gray rounded-md resize-none"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default BlogData;
