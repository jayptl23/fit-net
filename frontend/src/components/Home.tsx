import { Pagination, Stack } from "@mui/material";
import StudioList from "./StudioList";
import LocationSearchForm from "./LocationSearchForm";

function Home() {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <StudioList />
        <LocationSearchForm />
      </Stack>
      <Pagination
        sx={{
          alignSelf: "center",
          marginTop: "48px",
        }}
        count={4}
        variant="outlined"
      />
    </Stack>
  );
}

export default Home;
