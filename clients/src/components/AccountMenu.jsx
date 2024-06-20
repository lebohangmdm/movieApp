import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/features/auth/auth";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function AccountMenu() {
  const isAuth = useSelector(getAuth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isAuth ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onMouseEnter={handleMouseEnter}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                background: "#2c2e4c",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMouseLeave} sx={{ color: "#e6e6e6" }}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleMouseLeave} sx={{ color: "#e6e6e6" }}>
              <Avatar /> My account
            </MenuItem>
            <MenuItem onClick={handleMouseLeave} sx={{ color: "#e6e6e6" }}>
              <ListItemIcon>
                <PersonAdd fontSize="small" sx={{ color: "#e6e6e6" }} />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleMouseLeave} sx={{ color: "#e6e6e6" }}>
              <ListItemIcon>
                <Settings fontSize="small" sx={{ color: "#e6e6e6" }} />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleMouseLeave} sx={{ color: "#e6e6e6" }}>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "#e6e6e6" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Link
            to={"/login"}
            className="flex items-center gap-1 text-[15px] text-light-2  hover:text-light-1 font-medium  md:text-base  md:text-darkBluesh-2 md:hover:text-darkBluesh-2 md:py-1.5 md:px-4 md:bg-light-1 md:rounded-lg md:hover:bg-white transition-all duration-200"
          >
            <span>
              <UserIcon className="h-4 w-4" />
            </span>
            <span>Sign In</span>
          </Link>
        </>
      )}
    </React.Fragment>
  );
}
