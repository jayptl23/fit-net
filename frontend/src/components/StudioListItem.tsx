import { Link } from "react-router-dom";
import { Studio } from "../types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

type Props = {
  studio: Studio;
};

function StudioListItem({ studio }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "200px",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          alignSelf: "center",
          marginLeft: "50px",
        }}
      >
        <Stack sx={{ width: "256px" }}>
          <Typography
            color={blueGrey[900]}
            sx={{ fontSize: "24px", fontWeight: 600 }}
            component="h2"
          >
            {studio.name}
          </Typography>
          <Box>
            <Typography color={blueGrey[600]}>
              {studio.location.address}
            </Typography>
            <Typography
              color={blueGrey[600]}
            >{`${studio.location.city}, ${studio.location.state}`}</Typography>
            <Typography color={blueGrey[600]}>
              {studio.location.zip_code}
            </Typography>
          </Box>
          <Button
            component={Link}
            sx={{
              width: "128px",
              marginTop: "16px",
              textTransform: "none",
              fontSize: "16px",
            }}
            to={`/studios/${studio.id}`}
            variant="outlined"
            disableElevation
            size="small"
            startIcon={<VisibilityOutlinedIcon />}
          >
            Details
          </Button>
        </Stack>
      </Box>
      <img src={`/${studio.thumbnail.name}.jpg`} width={300} alt="Thumbnail" />
    </Paper>
  );
}

export default StudioListItem;
