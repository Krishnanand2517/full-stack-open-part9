import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./services/diaryService";
import Entries from "./components/Entries";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const notify = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  return (
    <div>
      <DiaryForm entries={diaries} setEntries={setDiaries} setError={notify} />
      <Notification errMsg={errorMessage} />
      <Entries diaries={diaries} />
    </div>
  );
};

export default App;
