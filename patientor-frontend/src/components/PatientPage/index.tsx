import { useState, useEffect } from "react";
import { Gender, Patient, Entry, NewEntry, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Male, Female } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import Entries from "./Entries";
import HealthCheckForm from "./HealthCheckForm";
import axios from "axios";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState("");

  const [showHealthCheck, setShowHealthCheck] = useState(false);
  const [showHospital, setShowHospital] = useState(false);
  const [showOccupational, setShowOccupational] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const patientData = await patientService.getOne(id);
      if (patientData) {
        setPatient(patientData);
        setEntries(patientData.entries);
      }

      const diagnosisData = await diagnosisService.getAll();
      if (diagnosisData) {
        setDiagnoses(diagnosisData);
      }
    };

    fetch();
  }, [id]);

  const notify = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const entry = await patientService.createEntry(values, patient?.id);
      if (entry) {
        setEntries(entries.concat(entry));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response.data === "string") {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          notify(message);
        } else {
          notify("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        notify("Unknown error");
      }
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" fontWeight={600} style={{ marginTop: "1em" }}>
        {patient.name}
        {"    "}
        {patient.gender === Gender.Male ? (
          <Male />
        ) : patient.gender === Gender.Female ? (
          <Female />
        ) : null}
      </Typography>

      <p>
        <Typography variant="body2">
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
        </Typography>
      </p>

      {error && <Alert severity="error">{error}</Alert>}

      {!showHealthCheck && !showHospital && !showOccupational ? (
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
              color="success"
              type="button"
              variant="contained"
              onClick={() => setShowHealthCheck(true)}
            >
              Add Health Check Entry
            </Button>
          </div>
          <div>
            <Button
              color="secondary"
              type="button"
              variant="contained"
              onClick={() => setShowHospital(true)}
            >
              Add Hospital Entry
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              type="button"
              variant="contained"
              onClick={() => setShowOccupational(true)}
            >
              Add Occupational Healthcare Entry
            </Button>
          </div>
        </div>
      ) : null}

      {showHealthCheck && (
        <HealthCheckForm
          diagnoses={diagnoses}
          onSubmit={submitNewEntry}
          setShow={setShowHealthCheck}
        />
      )}
      {showHospital && (
        <HospitalForm
          diagnoses={diagnoses}
          onSubmit={submitNewEntry}
          setShow={setShowHospital}
        />
      )}
      {showOccupational && (
        <OccupationalHealthcareForm
          diagnoses={diagnoses}
          onSubmit={submitNewEntry}
          setShow={setShowOccupational}
        />
      )}

      <Entries entries={entries} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientPage;
