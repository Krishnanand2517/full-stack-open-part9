interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseDescribed {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseDescribed {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CourseDescribed {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
