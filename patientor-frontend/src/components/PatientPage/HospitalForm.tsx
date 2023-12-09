import React, { useState } from "react";

import { Typography, TextField, Button } from "@mui/material";

import DiagnosisCodesMultiSelect from "../DiagnosisCodesMultiSelect";

import { NewEntry, Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: NewEntry) => Promise<void>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const HospitalForm = ({ onSubmit, diagnoses, setShow }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      type: "Hospital",
      diagnosisCodes: diagnosisCodesInput,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
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
        New Hospital entry
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

        <Typography variant="body1" color={"GrayText"} marginTop="2em">
          Discharge
        </Typography>
        <div style={{ marginLeft: "2em" }}>
          <TextField
            type="date"
            label="Discharge Date"
            fullWidth
            style={{ marginTop: "1.5em" }}
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Criteria"
            fullWidth
            variant="standard"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalForm;
