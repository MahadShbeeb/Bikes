import BikeCard from "@/components/bikes/BikeCard";
import { MAIN_CONTAINER_BREAK_POINT } from "@/constants/general";
import { Bike } from "@/types/Bike";
import { Query } from "@/types/Query";
import { TheftCountResponse } from "@/types/TheftCountResponse";
import { useDebounce } from "@/utils/helper";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";

type BikesPageProps = {
  bikes: Bike[];
  currentPage: number;
  theftsCountCases: number;
};

const StyledInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    background: "#E9E9E9",
    fontSize: 16,
    padding: "10px 40px 10px 20px",
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const BikesPage: React.FC<BikesPageProps> = ({
  bikes,
  currentPage,
  theftsCountCases,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [sort, setSort] = useState(router.query.sort || "default");
  const [search, setSearch] = useState(router.query.search || "");
  const debouncedSearch = useDebounce(search, 500);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(false);
  const [bikesFromClient, setBikesFromClient] = useState<Bike[]>(bikes);
  const { enqueueSnackbar } = useSnackbar();
  const [theftsCount, setTheftsCount] = useState<number>(theftsCountCases);

  const getTheftCount = useCallback(async () => {
    setIsLoadingCount(true);
    try {
      const theftCountResponse: TheftCountResponse = await axios.get(
        `https://bikeindex.org/api/v3/search/count?query=${debouncedSearch}&location=Munich&stolenness=proximity`
      );

      setTheftsCount(theftCountResponse?.data?.stolen || 0);
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
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch?.trim().length > 0) {
      getTheftCount();
    }
  }, [debouncedSearch]);

  const fetchBikes = async (page: number) => {
    const params = new URLSearchParams();

    if (page !== 1) {
      params.append("page", page.toString());
    }

    if (sort && sort !== "default") {
      params.append("sort", sort.toString());
    }

    if (debouncedSearch && debouncedSearch.trim().length > 0) {
      params.append("search", debouncedSearch);
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=10${
          debouncedSearch && `&query=${debouncedSearch}`
        }&location=Munich&stolenness=proximity`
      );

      const newBikes = response?.data?.bikes;

      setBikesFromClient(newBikes);
      setCurrentPageState(page);

      const query: Query = {};
      if (page !== 1) {
        query.page = page;
      }
      if (typeof sort === "string" && sort !== "default") {
        query.sort = sort;
      }
      if (debouncedSearch && debouncedSearch.trim().length > 0) {
        query.search = debouncedSearch;
      }

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPageState(1);
    fetchBikes(1);
  }, [sort, debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string | string[]>) => {
    setSort(event.target.value);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchBikes(value);
  };

  return (
    <Container maxWidth={MAIN_CONTAINER_BREAK_POINT} sx={{ padding: "4rem 0" }}>
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
              paddingBottom: "2rem",
              textAlign: "center",
            }}
          >
            The total number of bike theft cases: {theftsCount}
          </Typography>
        )
      )}
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          height: "3rem",
          margin: "3rem 0",
          display: "flex",
          alignItems: "center",
          background: "#E9E9E9",
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
            color: theme.palette.primary.main,
            background: "#E9E9E9",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { md: "flex-end", xs: "center" },
          width: "100%",
          gap: "1rem",
        }}
      >
        <FormControl variant="outlined">
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography sx={{ fontSize: 16 }}>Sort by</Typography>
            <Select
              value={sort}
              onChange={handleSortChange}
              input={<StyledInput />}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </Box>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
        {bikesFromClient.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">No bikes available</Typography>
          </Grid>
        ) : (
          bikesFromClient.map((bike) => (
            <Grid item xs={12} sm={6} key={bike.id}>
              <BikeCard bike={bike} />
            </Grid>
          ))
        )}
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {bikesFromClient && bikesFromClient.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Pagination
            count={Math.ceil(theftsCount / 10)}
            page={currentPageState}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default BikesPage;

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      "https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=Munich&stolenness=proximity"
    );

    const theftCountResponse: TheftCountResponse = await axios.get(
      `https://bikeindex.org:443/api/v3/search/count?location=Munich&stolenness=proximity`
    );
    const bikes = res?.data?.bikes;
    const theftsCountCases = theftCountResponse?.data?.stolen;

    return {
      props: {
        bikes,
        currentPage: 1,
        theftsCountCases,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data || error.message);
    } else {
      console.error(error);
    }
    return {
      props: {
        bikes: [],
        currentPage: 1,
        theftsCountCases: 1,
      },
    };
  }
};
