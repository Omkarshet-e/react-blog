import { useEffect } from "react";

function Blogs() {
  useEffect(() => {
    document.title = "All Blogs";
    return () => (document.title = "React Blog");
  }, []);
  return <div>All Blogs</div>;
}

export default Blogs;
