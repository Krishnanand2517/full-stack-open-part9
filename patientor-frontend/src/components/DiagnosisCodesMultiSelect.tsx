import {
  Chip,
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { Diagnosis } from "../types";

interface Props {
  diagnoses: Diagnosis[];
  diagnosisCodesInput: string[];
  setDiagnosisCodesInput: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosisCodesMultiSelect = ({
  diagnoses,
  diagnosisCodesInput,
  setDiagnosisCodesInput,
}: Props) => {
  return (
    <FormControl sx={{ m: 1, width: 900 }}>
      <InputLabel>Diagnosis Codes</InputLabel>
      <Select
        multiple
        value={diagnosisCodesInput}
        onChange={(e) => {
          const value = e.target.value as string | string[];
          setDiagnosisCodesInput(Array.isArray(value) ? value : [value]);
        }}
        input={<OutlinedInput label="Diagnosis Codes" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setDiagnosisCodesInput(
                    diagnosisCodesInput.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {diagnoses.map((d) => (
          <MenuItem key={d.code} value={d.code}>
            {d.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodesMultiSelect;
