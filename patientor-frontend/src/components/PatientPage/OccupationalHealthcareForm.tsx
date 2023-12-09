import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

import DiagnosisCodesMultiSelect from "../DiagnosisCodesMultiSelect";

import { NewEntry, Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: NewEntry) => Promise<void>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const OccupationalHealthcareForm = ({
  onSubmit,
  diagnoses,
  setShow,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      type: "OccupationalHealthcare",
      diagnosisCodes: diagnosisCodesInput,
      employerName,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      },
    });
  };

  return (
    <div style={{ padding: 8, borderStyle: "dashed", borderWidth: 2 }}>
      <Typography
        variant="body1"
        fontWeight={600}
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        New Occupational Healthcare entry
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

        <DiagnosisCodesMultiSelect
          diagnoses={diagnoses}
          diagnosisCodesInput={diagnosisCodesInput}
          setDiagnosisCodesInput={setDiagnosisCodesInput}
        />

        <TextField
          label="Employer"
          fullWidth
          variant="standard"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <Typography variant="body1" color={"GrayText"} marginTop="2em">
          Sick Leave
        </Typography>
        <div style={{ marginLeft: "2em" }}>
          <TextField
            type="date"
            label="Start"
            fullWidth
            style={{ marginTop: "1.5em" }}
            InputLabelProps={{ shrink: true }}
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
          />
          <TextField
            type="date"
            label="End"
            fullWidth
            style={{ marginTop: "1.5em" }}
            InputLabelProps={{ shrink: true }}
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
          />
        </div>

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

export default OccupationalHealthcareForm;
