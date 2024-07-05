import { Button, Stack, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <Stack alignItems="center">
      <Typography
        component="h2"
        sx={{ fontSize: "28px", fontWeight: 500, color: blueGrey[800] }}
        mb={2}
      >
        Get started with an account today.
      </Typography>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} sx={{ width: "400px" }}>
          <TextField type="email" label="Email" variant="outlined" />
          <TextField label="Username" variant="outlined" />
          <TextField type="password" label="Password" variant="outlined" />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default Register;
