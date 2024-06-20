import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="hidden z-10 lg:block ">
      <form>
        <IconButton
          onClick={toggleSearch}
          sx={{ color: "#e6e6e6", ":active": "#e6e6e6" }}
        >
          {!searchVisible && (
            <SearchIcon sx={{ color: "#e6e6e6", ":active": "#e6e6e6" }} />
          )}
        </IconButton>
        {searchVisible && (
          <TextField
            autoFocus
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#4d4d4d" },
                "&:hover fieldset": { borderColor: "#9499f" },
                "&.Mui-focused fieldset": { borderColor: "#9499ff" },
                borderRadius: "3px",
                maxWidth: "230px",
              },
            }}
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleSearch}>
                    <SearchIcon sx={{ color: "#e6e6e6" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
