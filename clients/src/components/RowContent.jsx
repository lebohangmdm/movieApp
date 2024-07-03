// import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";

import { Link } from "react-router-dom";

const RowContent = ({ content }) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <Link to={`/watch/${content.id}`}>
      <div className="h-28  min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-52 md:min-w-[260px]">
        <img
          src={content.coverImage}
          alt={content.title}
          className=" rounded-sm object-cover md:rounded "
        />
      </div>
    </Link>
  );
};

export default RowContent;
