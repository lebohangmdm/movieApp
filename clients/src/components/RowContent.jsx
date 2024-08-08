// import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";

import { Link } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";

const RowContent = ({ content }) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full  min-w-[230px] max-w-[240px] h-72 overflow-hidden block rounded relative hover:scale-105 transition-all">
      <Link to={`/watch/${content.id}`}>
        <img
          src={content.poster}
          alt={content.title}
          loading="lazy"
          className="rounded-sm object-cover img-bottom h-full mx-auto w-full md:rounded"
        />
      </Link>
      <OptionsMenu content={content} />
    </div>
  );
};

export default RowContent;
