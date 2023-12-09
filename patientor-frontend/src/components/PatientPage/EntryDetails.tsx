import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { Typography } from "@mui/material";
import { MedicalServices, Work, MonitorHeart } from "@mui/icons-material";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const renderEntryTypeIcon = () => {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return (
          <span style={{ fontStyle: "italic" }}>
            <Work width={10} /> {"  "}
            {entry.employerName}
          </span>
        );
      case "Hospital":
        return <MonitorHeart width={10} />;
      case "HealthCheck":
        return <MedicalServices width={10} />;

      default:
        return assertNever(entry);
    }
  };

  const renderHealthIcon = () => {
    if (entry.type === "HealthCheck") {
      switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
          return "💚";
        case HealthCheckRating.LowRisk:
          return "💛";
        case HealthCheckRating.HighRisk:
          return "⚠️";
        case HealthCheckRating.CriticalRisk:
          return "🔴";
        default:
          return null;
      }
    }
  };

  return (
    <div
      style={{
        padding: 6,
        marginBottom: 8,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 4,
      }}
    >
      <div>
        <Typography variant="body2">
          {entry.date} {"  "}
          {renderEntryTypeIcon()}
          <br />
          <span style={{ fontStyle: "italic" }}>{entry.description}</span>
        </Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                <Typography variant="body2">
                  {code}: {diagnoses.find((d) => d.code === code)?.name}
                </Typography>
              </li>
            ))}
          </ul>
        )}
        {renderHealthIcon()} <br />
        <Typography variant="body2">
          diagnosed by: {entry.specialist}
        </Typography>
      </div>
    </div>
  );
};

export default EntryDetails;
