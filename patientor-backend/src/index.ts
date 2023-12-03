import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(cors() as express.RequestHandler);
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("Radhe Radhe");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
