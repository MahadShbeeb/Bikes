import axiosInstance from "@/axios/AxiosInstance";
import BikesList from "@/components/bikes/BikesList";
import SearchInput from "@/components/bikes/SearchInput";
import SortSelect from "@/components/bikes/SortSelect";
import TotalTheftCases from "@/components/bikes/TotalTheftCases";
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
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

type BikesPageProps = {
  bikes: Bike[];
  currentPage: number;
  theftsCountCases: number;
};

const BikesPage: React.FC<BikesPageProps> = ({
  bikes,
  currentPage,
  theftsCountCases,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState(router.query.sort || "default");
  const [search, setSearch] = useState(router.query.search || "");
  const debouncedSearch = useDebounce(search, 500);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bikesFromClient, setBikesFromClient] = useState<Bike[]>(bikes);
  const { enqueueSnackbar } = useSnackbar();

  const [theftsCount, setTheftsCount] = useState<number>(0);
  const handleTheftsCountUpdate = (count: number) => {
    setTheftsCount(count);
  };

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
      const response = await axiosInstance.get(
        `?page=${page}&per_page=10${
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
      <TotalTheftCases
        debouncedSearch={debouncedSearch}
        theftsCountCases={theftsCountCases}
        onTheftsCountChange={handleTheftsCountUpdate}
      />
      <SearchInput search={search} handleSearchChange={handleSearchChange} />
      <Box
        sx={{
          display: "flex",
          justifyContent: { md: "flex-end", xs: "center" },
          width: "100%",
          gap: "1rem",
        }}
      >
        <SortSelect sort={sort} handleSortChange={handleSortChange} />
      </Box>
      <BikesList bikes={bikesFromClient} />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {bikesFromClient &&
        bikesFromClient.length > 0 &&
        Math.ceil(theftsCount / 10) > 1 && (
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
    const res = await axiosInstance.get(
      "?page=1&per_page=10&location=Munich&stolenness=proximity"
    );

    const theftCountResponse: TheftCountResponse = await axiosInstance.get(
      `/count?location=Munich&stolenness=proximity`
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
