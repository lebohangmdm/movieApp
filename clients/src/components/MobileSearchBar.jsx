import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileSearchBar = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const title = e.target.value;
    console.log(title);
    setName(title);
    navigate(title ? `/search/${encodeURIComponent(title)}` : "/");
  };

  return (
    <input
      type="text"
      className="py-3 px-6 text-white text-sm bg-transparent border border-white w-full focus:outline-none focus:border focus:border-gray-400 rounded-lg"
      placeholder="search"
      value={name}
      onChange={handleChange}
    />
  );
};

export default MobileSearchBar;
