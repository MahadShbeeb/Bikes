import BikeCard from "@/components/bikes/BikeCard";
import { MAIN_CONTAINER_BREAK_POINT } from "@/constants/general";
import { Bike } from "@/types/Bike";
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
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

type BikesPageProps = {
  bikes: Bike[];
  currentPage: number;
  totalPages: number;
  theftsCountCases: number;
};

type Query = {
  page?: number;
  sort?: string;
  search?: string;
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
  totalPages,
  theftsCountCases,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [sort, setSort] = useState(router.query.sort || "default");
  const [search, setSearch] = useState(router.query.search || "");
  const debouncedSearch = useDebounce(search, 500);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bikesFromClient, setBikesFromClient] = useState<Bike[]>(bikes);
  const { enqueueSnackbar } = useSnackbar();
  const [theftsCount, setTheftsCount] = useState<number>(theftsCountCases);

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
      // const theftCountResponse: any = await axios.get(
      //   `https://bikeindex.org:443/api/v3/search/count${
      //     debouncedSearch && `?query=${debouncedSearch}`
      //   }&location=Munich&stolenness=proximity`
      // );
      // console.log("theftCountResponse", theftCountResponse);
      // setTheftsCount(theftCountResponse?.stolen);
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
      enqueueSnackbar("Something went wrong", { variant: "error" });
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

  const handleSortChange = (event: any) => {
    setSort(event.target.value as string);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchBikes(value);
  };

  return (
    <Container maxWidth={MAIN_CONTAINER_BREAK_POINT} sx={{ padding: "4rem 0" }}>
      {theftsCount && theftsCount > 0 && (
        <Typography
          sx={{
            fontSize: "1.5rem",
            paddingBottom: "2rem",
            textAlign: "center",
          }}
        >
          The total number of bike theft cases {theftsCount}
        </Typography>
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
        {bikesFromClient.map((bike) => (
          <Grid item xs={12} sm={6} key={bike.id}>
            <BikeCard bike={bike} />
          </Grid>
        ))}
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
    </Container>
  );
};

export default BikesPage;

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      "https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=Munich&stolenness=proximity"
    );

    const theftCountResponse: any = await axios.get(
      `https://bikeindex.org:443/api/v3/search/count?location=Munich&stolenness=proximity`
    );
    const bikes = res?.data?.bikes;
    const theftsCountCases = theftCountResponse?.data?.stolen;

    return {
      props: {
        bikes,
        currentPage: 1,
        totalPages: Math.ceil(theftsCountCases / 10),
        theftsCountCases,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        bikes: [],
        currentPage: 1,
        totalPages: 1,
        theftsCountCases: 1,
      },
    };
  }
};
