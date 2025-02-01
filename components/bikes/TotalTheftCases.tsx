import axiosInstance from "@/axios/AxiosInstance";
import { TheftCountResponse } from "@/types/TheftCountResponse";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";

type TotalTheftCasesProps = {
  debouncedSearch: string;
  theftsCountCases: number;
  onTheftsCountChange: (count: number) => void;
};

const TotalTheftCases: React.FC<TotalTheftCasesProps> = ({
  debouncedSearch,
  theftsCountCases,
  onTheftsCountChange,
}) => {
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(false);
  const [theftsCount, setTheftsCount] = useState<number>(theftsCountCases);
  const { enqueueSnackbar } = useSnackbar();

  const getTheftCount = useCallback(async () => {
    setIsLoadingCount(true);
    try {
      const theftCountResponse: TheftCountResponse = await axiosInstance.get(
        `/count?query=${debouncedSearch}&location=Munich&stolenness=proximity`
      );

      const count = theftCountResponse?.data?.stolen || 0;
      setTheftsCount(count);
      onTheftsCountChange(count);
    } catch (error) {
      if (error instanceof AxiosError) {
        enqueueSnackbar(
          error.response?.data || error?.message || "Something went wrong",
          {
            variant: "error",
          }
        );
      } else {
        console.error(error);
      }
    }
    setIsLoadingCount(false);
  }, [debouncedSearch, onTheftsCountChange]);

  useEffect(() => {
    getTheftCount();
  }, [debouncedSearch]);

  return (
    <Box>
      {isLoadingCount ? (
        <Box>
          <CircularProgress
            size="2rem"
            sx={{
              display: "block",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          />
        </Box>
      ) : (
        theftsCount &&
        theftsCount > 0 && (
          <Typography
            sx={{
              fontSize: "1.5rem",
              textAlign: "center",
              fontFamily: "Segoe UI",
            }}
          >
            The total number of bike theft cases: {theftsCount}
          </Typography>
        )
      )}
    </Box>
  );
};

export default TotalTheftCases;
