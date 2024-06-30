import express from "express";
import fbiRoute from "./routers/fbi.router.js";

const __dirname = import.meta.dirname + "/public";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use("/", fbiRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
