import { Class, Studio } from "../types";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "../helpers";
import { useNavigate, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

function StudioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    fetchStudioData();
  }, [studio]);

  const fetchStudioData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/studios/${id}`);
      if (!response.ok) {
        // Handle error case, e.g., navigate to an error page
        //   navigate("/error", {
        //     state: { error: "Failed to fetch studio data" },
        //   });
        navigate("/error");
        return;
      }
      const data = await response.json();
      setStudio(data.studio);
      setClasses(data.classes);
    } catch (error) {
      console.error("Error fetching studio data:", error);
      // Handle error case, e.g., navigate to an error page
      // navigate("/error", { state: { error: "Failed to fetch studio data" } });
      navigate("error");
    }
  };

  return (
    <Box>
      {studio ? (
        <>
          <Stack direction="row" justifyContent="center" spacing={10}>
            <Stack>
              <Typography
                variant="h4"
                component="h2"
                color={blueGrey[900]}
                sx={{ fontSize: "24px", fontWeight: 600 }}
              >
                {studio.name}
              </Typography>
              <Typography color={blueGrey[700]} mt={1}>
                {studio.location.address}
              </Typography>
              <Typography
                color={blueGrey[700]}
              >{`${studio.location.city}, ${studio.location.state}`}</Typography>
              <Typography color={blueGrey[700]}>
                {studio.location.zip_code}
              </Typography>
              <Typography color={blueGrey[700]} mt={1}>
                Phone: {formatPhoneNumber(studio.phone_number)}
              </Typography>

              <Typography
                sx={{ marginTop: "10px" }}
                variant="h6"
                component="h3"
              >
                Amenities
              </Typography>
              <Typography color={blueGrey[700]}>
                {studio.amenities.map((a) => a.name).join(", ")}
              </Typography>
            </Stack>

            <Carousel useKeyboardArrows={true} width={500}>
              {studio.images.map((image, index) => (
                <div key={index}>
                  <img
                    alt={image.name}
                    src={`/${image.name}.jpg`}
                    key={index}
                  />
                </div>
              ))}
            </Carousel>
          </Stack>

          {classes.length > 0 && (
            <Stack alignItems="center">
              <Typography
                sx={{ fontSize: "24px", fontWeight: 500 }}
                variant="h5"
                component="h2"
              >
                Classes
              </Typography>

              <Stack spacing={1} sx={{ marginX: "150px" }}>
                {classes.map((c) => {
                  return (
                    <Paper
                      key={c.id}
                      variant="outlined"
                      sx={{ padding: "20px" }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h6">{c.name}</Typography>
                        <Button disableElevation variant="contained">
                          Enroll
                        </Button>
                      </Stack>
                      <Typography>
                        {c.day} {c.time}
                      </Typography>
                      <Typography>Coach: {c.coach}</Typography>
                      <Typography variant="body2" sx={{ marginTop: "10px" }}>
                        {c.description}
                      </Typography>
                    </Paper>
                  );
                })}
              </Stack>
            </Stack>
          )}
        </>
      ) : (
        "Loading studio..."
      )}
    </Box>
  );
}

export default StudioDetails;
