import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-black text-white rounded-lg shadow-lg  capitalize cursor-pointer hover:border hover:border-white hover:text-white">
        <CloudArrowUpIcon className="w-8 h-8" />
        <span className="mt-2 text-base leading-normal">Drag Your Image</span>
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>

      {selectedImage && (
        <div className="mt-4">
          <img src={selectedImage} alt="Preview" className="max-w-xs mx-auto" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
