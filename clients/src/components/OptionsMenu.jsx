import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Theaters } from "@mui/icons-material";
import { Link } from "react-router-dom";

const OptionsMenu = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      </Menu>
    </div>
  );
};

export default OptionsMenu;
