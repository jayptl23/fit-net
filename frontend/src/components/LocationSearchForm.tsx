import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

function LocationSearchForm() {
  return (
    <Box
      p={4}
      sx={{
        borderRadius: "8px",
        border: "2px solid",
        borderColor: blueGrey[50],
      }}
    >
      <Typography align="center" mb={2} color={blueGrey[800]}>
        Find studios nearby
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack spacing={2}>
          <TextField id="outlined-basic" label="Latitude" variant="outlined" />
          <TextField id="outlined-basic" label="Longitude" variant="outlined" />
          <Button
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
            type="submit"
            variant="contained"
            disableElevation
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default LocationSearchForm;
