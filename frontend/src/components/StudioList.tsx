import { useEffect, useState } from "react";
import { Studio } from "../types";
import StudioListItem from "./StudioListItem";
import { Stack } from "@mui/material";

function StudioList() {
  const [studiosData, setStudiosData] = useState<Studio[]>([]);

  useEffect(() => {
    async function fetchStudios() {
      fetch("http://localhost:8000/studios")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setStudiosData(data.studios);
        })
        .catch((err) => console.log(err));
    }

    fetchStudios();
  }, []);

  return (
    <Stack sx={{ width: 600 }} spacing={2}>
      {studiosData.map((studio) => (
        <StudioListItem key={studio.id} studio={studio} />
      ))}
    </Stack>
  );
}

export default StudioList;
