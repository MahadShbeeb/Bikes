import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

type SortSelectProps = {
  sort: string | string[];
  handleSortChange: (event: SelectChangeEvent<string | string[]>) => void;
};

const StyledInput = styled(InputBase)(({}) => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    background: "#F5F5F5",
    fontSize: 16,
    padding: "10px 40px 10px 20px",
    "&:focus": {
      background: "#E9E9E9",
    },
  },
}));

const SortSelect: React.FC<SortSelectProps> = ({ sort, handleSortChange }) => {
  return (
    <FormControl variant="outlined">
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography sx={{ fontSize: 16, fontFamily: "Segoe UI" }}>
          Sort by
        </Typography>
        <Select
          value={sort}
          onChange={handleSortChange}
          input={<StyledInput />}
          sx={{ fontFamily: "Segoe UI" }}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </Box>
    </FormControl>
  );
};

export default SortSelect;
