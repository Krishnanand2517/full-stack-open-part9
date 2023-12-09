import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

interface Props {
  healthRating: number;
  setHealthRating: React.Dispatch<React.SetStateAction<number>>;
}

const HealthRatingSelect = ({ healthRating, setHealthRating }: Props) => {
  return (
    <FormControl sx={{ m: 1, width: 900 }}>
      <InputLabel>Health Rating</InputLabel>
      <Select
        value={healthRating}
        label="Age"
        input={<OutlinedInput label="Health Rating" />}
        onChange={({ target }) => setHealthRating(Number(target.value))}
      >
        <MenuItem value={0}>Healthy 💚</MenuItem>
        <MenuItem value={1}>Low Risk 💛</MenuItem>
        <MenuItem value={2}>High Risk ⚠️</MenuItem>
        <MenuItem value={3}>Critical Risk 🔴</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HealthRatingSelect;
