import { DiaryEntry } from "../types";

const Entries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((d) => (
        <p key={d.id}>
          <h3>{d.date}</h3>
          visibility: {d.visibility} <br />
          weather: {d.weather} <br />
        </p>
      ))}
    </div>
  );
};

export default Entries;
