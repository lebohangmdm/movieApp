// import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";

import { Link } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";

const RowContent = ({ content }) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full  min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all">
      <Link to={`/watch/${content.id}`}>
        <img
          src={content.coverImage}
          alt={content.title}
          className=" rounded-sm object-cover mx-auto  object-bottom w-full md:rounded "
        />
      </Link>
      <OptionsMenu content={content} />
    </div>
  );
};

export default RowContent;
