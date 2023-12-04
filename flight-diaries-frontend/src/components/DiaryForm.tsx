import React, { useState } from "react";
import { DiaryEntry } from "../types";
import { createEntry } from "../services/diaryService";

const DiaryForm = ({
  entries,
  setEntries,
  setError,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setError: (message: string) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const onVisibilityOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value);
  };

  const onWeatherOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newEntry = {
      id: entries.length + 1,
      date,
      visibility,
      weather,
      comment,
    };

    createEntry(newEntry)
      .then((data) => {
        setEntries(entries.concat(data));
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setError(error.message);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          visibility: great
          <input
            type="radio"
            name="great"
            value="great"
            checked={visibility === "great"}
            onChange={onVisibilityOptionChange}
          />
          {"   "} good
          <input
            type="radio"
            name="good"
            value="good"
            checked={visibility === "good"}
            onChange={onVisibilityOptionChange}
          />
          {"   "} ok
          <input
            type="radio"
            name="ok"
            value="ok"
            checked={visibility === "ok"}
            onChange={onVisibilityOptionChange}
          />
          {"   "} poor
          <input
            type="radio"
            name="poor"
            value="poor"
            checked={visibility === "poor"}
            onChange={onVisibilityOptionChange}
          />
        </div>

        <div>
          weather: sunny
          <input
            type="radio"
            name="sunny"
            value="sunny"
            checked={weather === "sunny"}
            onChange={onWeatherOptionChange}
          />
          {"   "} rainy
          <input
            type="radio"
            name="rainy"
            value="rainy"
            checked={weather === "rainy"}
            onChange={onWeatherOptionChange}
          />
          {"   "} cloudy
          <input
            type="radio"
            name="cloudy"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={onWeatherOptionChange}
          />
          {"   "} stormy
          <input
            type="radio"
            name="stormy"
            value="stormy"
            checked={weather === "stormy"}
            onChange={onWeatherOptionChange}
          />
          {"   "} windy
          <input
            type="radio"
            name="windy"
            value="windy"
            checked={weather === "windy"}
            onChange={onWeatherOptionChange}
          />
        </div>

        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
