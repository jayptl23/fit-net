import { Button, Paper, Stack, Typography } from "@mui/material";
import { useUserStore } from "../store";
import { blueGrey } from "@mui/material/colors";

export default function UserClasses() {
  const classes = useUserStore((state) => state.classes);

  return (
    <>
      {classes.length > 0 ? (
        <Stack alignItems="center" sx={{ width: "700px", mx: "auto" }}>
          <Typography
            sx={{ marginBottom: "16px", fontSize: "28px", fontWeight: 600 }}
            variant="h4"
            color={blueGrey[900]}
          >
            Your Classes
          </Typography>
          {classes.map((c) => {
            return (
              <Paper
                key={c.id}
                className="my-4 border-neutral-200 border-2 p-4 rounded-md"
                sx={{ paddingY: "20px", paddingX: "40px", width: "512px" }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={4}
                >
                  <Stack>
                    <Typography
                      color={blueGrey[800]}
                      component="h5"
                      sx={{ fontWeight: 500, fontSize: "24px" }}
                    >
                      {c.name} @ {c.studio.name}
                    </Typography>
                    <Typography color={blueGrey[700]}>
                      {c.day} {c.time}
                    </Typography>
                  </Stack>
                  <Button disableElevation variant="contained">
                    Unenroll
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Typography color={blueGrey[700]}>
          You are not enrolled in any classes.
        </Typography>
      )}
    </>
  );
}
