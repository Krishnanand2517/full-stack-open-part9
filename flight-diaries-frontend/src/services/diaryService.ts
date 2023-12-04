import axios from "axios";
import { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (object: DiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};
