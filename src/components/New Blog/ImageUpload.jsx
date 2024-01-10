/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaTimes, FaImages } from "react-icons/fa";

function ImageUpload({ setImageFileData }) {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  // const [selectedFile, setSelectedFile] = useState({});

  function handleChange(e) {
    e.preventDefault();
    try {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name);
      setImageFileData(e.target.files[0]);
    } catch (error) {
      setFile(null);
    }
  }

  function formReset() {
    document.getElementById("form").reset();
    setFile(null);
    setImageFileData(null);
  }

  return (
    <div className="flex-1 flex flex-col items-center p-2 gap-6 justify-start h-fit">
      <div className="relative bg-dark-variant-gray w-full h-auto grow-0 aspect-video rounded-xl overflow-hidden">
        {!file && (
          <div className="w-full h-full bg-dark-primary-black flex justify-center items-center ">
            <div className="flex flex-col items-center">
              {/* <FaImages color="white" opacity="0.6" size={200} /> */}
              <FaImages className="text-white/60 xl:text-[13rem] lg:text-9xl md:text-8xl text-8xl " />
              <h1 className="text-white/40 max-sm:text-sm">
                {" "}
                Upload to see Image Preview
              </h1>
            </div>
          </div>
        )}
        {file && (
          <img
            src={file}
            alt="File Preview"
            className="w-full  h-full object-cover bg-gradient-to-t from-black to-white"
          />
        )}
        {file && (
          <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-t from-transparent to-dark-variant-gray text-white flex items-start justify-between">
            <h1 className=" w-3/4  truncate m-2 px-2 ">{imageName}</h1>
            <div
              className="hover:bg-red-500 p-2 rounded-sm cursor-pointer"
              onClick={formReset}
            >
              <FaTimes size={24} />
            </div>
          </div>
        )}
      </div>
      <form id="form">
        <input
          className={` rounded-full bg-dark-variant-gray max-w-64 sm:max-w-full
          text-sm max-sm:text-xs text-white text-ellipsis overflow-hidden pr-5 max-sm:pr-1 max-sm:file:pr-1 
          
            file:mr-5 max-sm:file:mr-2 file:py-2 max-sm:file:py-1 file:px-6 max-sm:file:px-2
            file:rounded-full file:border-0
            file:text-base max-sm:file:text-sm file:font-semibold
             file:text-black 
            hover:file:cursor-pointer file:bg-primary-pink
            `}
          accept="image/*"
          type="file"
          name="picture"
          id="picture"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default ImageUpload;
