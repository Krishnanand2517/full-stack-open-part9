import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

import HealthRatingSelect from "../HealthRatingSelect";
import DiagnosisCodesMultiSelect from "../DiagnosisCodesMultiSelect";

import { NewEntry, Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: NewEntry) => Promise<void>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const HealthCheckForm = ({ onSubmit, diagnoses, setShow }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string[]>([]);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      type: "HealthCheck",
      healthCheckRating,
      diagnosisCodes: diagnosisCodesInput,
    });
  };

  return (
    <div style={{ padding: 8, borderStyle: "dashed", borderWidth: 2 }}>
      <Typography
        variant="body1"
        fontWeight={600}
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        New Health Check entry
      </Typography>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          label="Date"
          fullWidth
          style={{ marginTop: "1.5em" }}
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          style={{ marginBottom: "1.5em" }}
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {/* <TextField
          label="HealthCheck Rating"
          fullWidth
          variant="standard"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        /> */}

        <HealthRatingSelect
          healthRating={healthCheckRating}
          setHealthRating={setHealthCheckRating}
        />

        <DiagnosisCodesMultiSelect
          diagnoses={diagnoses}
          diagnosisCodesInput={diagnosisCodesInput}
          setDiagnosisCodesInput={setDiagnosisCodesInput}
        />

        <div
          style={{
            margin: 8,
            padding: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button color="info" type="submit" variant="contained">
              Add
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HealthCheckForm;
