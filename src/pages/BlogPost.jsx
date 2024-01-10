import { useParams } from "react-router-dom";

function BlogPost() {
  let params = useParams();
  console.log(params.id);
  return (
    <div className="w-full py-2">
      <div className="lg:max-w-[calc(88%-4rem)] lg:mx-auto w-full max-lg:px-8 pt-6 ">
        <div className="img w-3/5 max-xl:w-4/5 mx-auto ">
          <img src="/assets/bg-hex.jpg" alt="" className="w-full h-full" />
        </div>
        <div className="w-4/5 mx-auto mt-8 divide-y-2 divide-white/40">
          <div className="p-2 text-2xl max-sm:text-xl  max-sm:-tracking-tighter tracking-wide font-bold capitalize">
            Need of react in todays eco sytem
          </div>
          <div className="p-2 mb-8 text-lg max-xl:text-base max-sm:text-sm font-medium">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              eligendi esse voluptatum placeat molestiae nam est, sapiente
              eveniet alias consequuntur reiciendis veniam tempora, iste
              delectus iure quod odio dolores praesentium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;