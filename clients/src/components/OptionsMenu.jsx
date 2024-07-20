import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Theaters } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import {
  useGetProfileQuery,
  useHateContentMutation,
  useLikeContentMutation,
} from "../services/usersService";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";

const OptionsMenu = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, error: userError } = useGetProfileQuery();

  const [
    likeContent,
    { isSuccess: likeSuccess, isError: isLikeError, error: likeError },
  ] = useLikeContentMutation();
  const [
    hateContent,
    { isSuccess: isHateSuccess, isError: isHateError, error: hateError },
  ] = useHateContentMutation();

  const id = content.id;
  const contents = data?.data?.doc?.favorites;

  const likedContent = contents.find((content) => content.id === id);

  const handleLike = async () => {
    await likeContent(likedContent);
    if (likeSuccess) return toast.success(`I like this`);
  };

  const handleHate = async () => {
    await hateContent();
    if (isHateSuccess) return toast.success("I hate this");
  };

  useEffect(() => {
    if (isLikeError) return toast.error(likeError?.data?.message);
  }, [isLikeError, likeError]);

  useEffect(() => {
    if (isHateError) return toast.error(hateError?.data?.message);
  }, [isHateError, hateError]);

  if (userError) return <ErrorMessage error={userError?.data?.message} />;

  return (
    <div className="absolute bottom-0 right-0">
      <IconButton
        aria-controls="options-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            marginTop: "30px",
            marginLeft: "20px",
            backgroundColor: "#333",
            boxShadow: "none",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: "14px",
          }}
        >
          <Link to={`/watch/${content.id}`}>
            <Theaters sx={{ marginRight: 1 }} />
            Watch Trailer
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            paddingRight: 1,
            fontSize: "14px",
          }}
        >
          <AddIcon sx={{ marginRight: 1 }} />
          My List
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            paddingRight: 1,
            fontSize: "14px",
          }}
        >
          {likedContent ? (
            <button className="flex items-center" onClick={handleHate}>
              <HandThumbDownIcon className="w-6 h-6 mr-2.5" />
              Hate this
            </button>
          ) : (
            <button className="flex items-center" onClick={handleLike}>
              <HandThumbUpIcon className="w-6 h-6 mr-2.5" />
              Like this
            </button>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OptionsMenu;
