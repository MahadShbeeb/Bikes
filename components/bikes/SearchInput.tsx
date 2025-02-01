import { Box } from "@mui/material";
import React from "react";

type SearchInputProps = {
  search: string | string[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  search,
  handleSearchChange,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        height: "3rem",
        margin: "3rem 0",
        display: "flex",
        alignItems: "center",
        background: "#F5F5F5",
      }}
    >
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder={"Search..."}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          marginInline: "1rem",
          background: "#F5F5F5",
          fontFamily: "Segoe UI",
        }}
      />
    </Box>
  );
};

export default SearchInput;
