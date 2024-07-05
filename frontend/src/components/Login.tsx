import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("submit form");
    // console.log(username, password);

    if (!username || !password) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        login(username, data.token, data.id);
        navigate("/studios");
      } else {
        // console.log("login failed");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      // console.log(error);
      console.error("Error: ", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target.name;
    // console.log(input, event.target.value);

    if (input === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  return (
    <Stack alignItems="center">
      <Typography
        component="h2"
        sx={{ fontSize: "28px", fontWeight: 500, color: blueGrey[800] }}
        mb={1}
      >
        Welcome back!
      </Typography>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} sx={{ width: "400px" }}>
          <TextField
            onChange={(e) => handleChange(e)}
            label="Username"
            variant="outlined"
            name="username"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            type="password"
            label="Password"
            variant="outlined"
            name="password"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default Login;
