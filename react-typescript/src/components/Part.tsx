import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <span style={{ fontWeight: "bold" }}>
            {coursePart.name} {coursePart.exerciseCount}
            <br />
          </span>
          <span style={{ fontStyle: "italic" }}>{coursePart.description}</span>
        </p>
      );
    case "group":
      return (
        <p>
          <span style={{ fontWeight: "bold" }}>
            {coursePart.name} {coursePart.exerciseCount}
            <br />
          </span>
          <span>group projects: {coursePart.groupProjectCount}</span>
        </p>
      );
    case "background":
      return (
        <p>
          <span style={{ fontWeight: "bold" }}>
            {coursePart.name} {coursePart.exerciseCount}
            <br />
          </span>
          <span style={{ fontStyle: "italic" }}>
            {coursePart.description} <br />
          </span>
          <span>submit to: {coursePart.backgroundMaterial}</span>
        </p>
      );
    case "special":
      return (
        <p>
          <span style={{ fontWeight: "bold" }}>
            {coursePart.name} {coursePart.exerciseCount}
            <br />
          </span>
          <span style={{ fontStyle: "italic" }}>
            {coursePart.description} <br />
          </span>
          <span>required skills: {coursePart.requirements.join(", ")}</span>
        </p>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
