import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatientInfo,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient,
  getOnePatient,
  addEntry,
};
