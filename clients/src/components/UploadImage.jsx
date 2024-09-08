import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

const UploadImage = ({ handleChange, image }) => {
  return (
    <div className="mx-auto border-2 border-dashed border-gray-300 px-4 py-6 rounded-lg flex flex-col justify-center items-center cursor-pointer relative overflow-hidden">
      <label className="w-full flex flex-col  items-center  bg-black text-white">
        <CloudArrowUpIcon className={`h-8 w-8 ${image ? "hidden" : "block"}`} />
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {image ? (
        <img
          src={image}
          alt="Uploaded"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <p className="text-gray-500 text-center text-sm mt-4">
          Drag and drop an image or click
        </p>
      )}
    </div>
  );
};

export default UploadImage;

// return (
//   <div className="mx-auto">
//     <label className="w-full flex flex-col  items-center px-4 py-6 bg-black text-white rounded-lg shadow-lg  capitalize cursor-pointer hover:border hover:border-white hover:text-white">
//       <CloudArrowUpIcon className="w-8 h-8" />
//       <span className="mt-2 text-base leading-normal">Drag Your Image</span>
//       <input type="file" className="hidden" onChange={handleImageChange} />
//     </label>

//     {selectedImage && (
//       <div className="mt-4">
//         <img src={selectedImage} alt="Preview" className="w-20 h-20  mx-auto" />
//       </div>
//     )}
//   </div>
// );
