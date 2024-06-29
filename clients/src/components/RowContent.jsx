// import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";

const RowContent = ({ show }) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-28  min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-52 md:min-w-[260px]">
      <img
        src={show.coverImage}
        alt={show.title}
        className=" rounded-sm object-cover md:rounded "
      />
    </div>
  );
};

export default RowContent;
