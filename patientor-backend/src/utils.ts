import {
  NewPatient,
  Gender,
  HealthCheckRating,
  Diagnosis,
  NewEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name");
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect SSN: " + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }

  return occupation;
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(Number(rating)) || !isRating(Number(rating))) {
    throw new Error("Incorrect rating: " + rating);
  }

  return Number(rating);
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Missing or invalid data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: Some fields are missing");
};

const parseDiagnosisCodes = (array: unknown): Array<Diagnosis["code"]> => {
  if (!array || !Array.isArray(array)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return array as Array<Diagnosis["code"]>;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Missing or invalid data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "Hospital": {
        const hospitalEntry = object as HospitalEntry;

        const newEntry: NewEntry = {
          description: parseName(hospitalEntry.description),
          date: parseDate(hospitalEntry.date),
          specialist: parseName(hospitalEntry.specialist),
          type: "Hospital",
          discharge: {
            date: parseDate(hospitalEntry.discharge.date),
            criteria: parseName(hospitalEntry.discharge.criteria),
          },
        };

        if ("diagnosisCodes" in hospitalEntry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(
            hospitalEntry.diagnosisCodes
          );
        }

        return newEntry;
      }

      case "OccupationalHealthcare": {
        const occupationalEntry = object as OccupationalHealthcareEntry;

        const newEntry: NewEntry = {
          description: parseName(occupationalEntry.description),
          date: parseDate(occupationalEntry.date),
          specialist: parseName(occupationalEntry.specialist),
          type: "OccupationalHealthcare",
          employerName: parseName(occupationalEntry.employerName),
          sickLeave: {
            startDate: parseDate(occupationalEntry.sickLeave?.startDate),
            endDate: parseDate(occupationalEntry.sickLeave?.endDate),
          },
        };

        if ("diagnosisCodes" in occupationalEntry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(
            occupationalEntry.diagnosisCodes
          );
        }

        return newEntry;
      }

      case "HealthCheck": {
        const healthCheckEntry = object as HealthCheckEntry;

        const newEntry: NewEntry = {
          description: parseName(healthCheckEntry.description),
          date: parseDate(healthCheckEntry.date),
          specialist: parseName(healthCheckEntry.specialist),
          type: "HealthCheck",
          healthCheckRating: parseRating(healthCheckEntry.healthCheckRating),
        };

        if ("diagnosisCodes" in healthCheckEntry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(
            healthCheckEntry.diagnosisCodes
          );
        }

        return newEntry;
      }

      default:
        throw new Error("Wrong type in new entry!");
    }
  }

  throw new Error("Incorrect data: Some fields are missing");
};

export { toNewPatient, toNewEntry };
