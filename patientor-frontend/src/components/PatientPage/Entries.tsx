import { Entry, Diagnosis } from "../../types";
import { Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (!entries) {
    return null;
  }

  return (
    <div>
      <Typography
        variant="h6"
        fontWeight={600}
        style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
      >
        entries
      </Typography>

      {entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default Entries;
