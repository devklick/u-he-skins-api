import express from "express";
import { getSkins } from "./u-he/u-he-webservice";

const PORT = 3000;

const app = express();

app.get("/skins", async (_, res) => {
  const skins = await getSkins();
  res.status(200).send(skins);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
