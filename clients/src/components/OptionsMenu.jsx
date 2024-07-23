import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Theaters } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import {
  useAddContentMutation,
  useGetProfileQuery,
  useHateContentMutation,
  useLikeContentMutation,
  useRemoveContentMutation,
} from "../services/usersService.js";
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

  const [likeContent, { isError: isLikeError, error: likeError }] =
    useLikeContentMutation();
  const [hateContent, { isError: isHateError, error: hateError }] =
    useHateContentMutation();

  const [addContent, { isError: isAddError, error: addError }] =
    useAddContentMutation();
  const [removeContent, { isError: isDeleteError, error: deleteError }] =
    useRemoveContentMutation();

  // HANDLE FAVOURITE
  const id = content?.id;
  const favorites = data?.data?.doc?.favorites;

  const existingLikeContent = favorites?.find((content) => content?.id === id);
  const contentId = existingLikeContent ? existingLikeContent?.id : id;

  const handleLike = async () => {
    try {
      const data = await likeContent({ content: contentId });

      if (data.data.status === "success")
        return toast.success(`Add to favourites`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHate = async () => {
    try {
      const data = await hateContent({ content: contentId });
      if (data.data === null) return toast.success("Remove from favourites");
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE CONTENT LIST
  const watchList = data?.data?.doc?.watchList;
  const existingListContent = watchList?.find((content) => content?.id === id);
  const listId = existingListContent ? existingListContent?.id : id;

  const handleAdd = async () => {
    try {
      const data = await addContent({ content: listId });

      if (data.data.status === "success") return toast.success("Add to list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await removeContent({ content: listId });
      if (data.data === null) return toast.success("Remove from list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLikeError && likeError?.data?.message) {
      toast.error(likeError.data.message);
    } else {
      // Dismiss any existing toast when `isLikeError` is false or `likeError.data.message` is falsy
      toast.dismiss();
    }

    // Cleanup function: Dismiss toast when the component unmounts or when `isLikeError` or `likeError` change
    return () => {
      toast.dismiss();
    };
  }, [isLikeError, likeError]);

  useEffect(() => {
    if (isHateError) {
      toast.error(hateError?.data?.message);
    } else {
      toast.dismiss();
    }

    return () => {
      toast.dismiss();
    };
  }, [isHateError, hateError]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError?.data?.message);
    } else {
      toast.dismiss();
    }
  }, [isAddError, addError]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteError?.data?.message);
    } else {
      toast.dismiss();
    }
  }, [isDeleteError, deleteError]);

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
          {existingListContent ? (
            <button className="flex items-center" onClick={handleDelete}>
              {" "}
              <DeleteIcon sx={{ marginRight: 1 }} /> <span>Remove List</span>{" "}
            </button>
          ) : (
            <button className="flex items-center" onClick={handleAdd}>
              {" "}
              <AddIcon sx={{ marginRight: 1 }} />
              <span>Add List</span>
            </button>
          )}
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
          {existingLikeContent ? (
            <button className="flex items-center" onClick={handleHate}>
              <HandThumbDownIcon className="w-6 h-6 mr-2.5" />
              <span>Hate this</span>
            </button>
          ) : (
            <button className="flex items-center" onClick={handleLike}>
              <HandThumbUpIcon className="w-6 h-6 mr-2.5" />
              <span>Like this</span>
            </button>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OptionsMenu;
