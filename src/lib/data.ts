
import type { LucideIcon } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  icon: string; // Changed from LucideIcon
  totalChapters: number;
  completedChapters: number;
  evaluationCriteria?: string;
  slidesUrl?: string;
  projectDetailsUrl?: string;
}

export interface Session {
  id: string;
  title: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  joinUrl: string;
  recordingUrl: string;
}

export interface ImportantUpdate {
  id: string;
  title: string;
  description: string;
  titleLink?: string;
}

export interface ApexUpdate {
  id: string;
  title: string;
  description: string;
  titleLink?: string;
}

export const importantUpdates: ImportantUpdate[] = [
  {
    id: 'update-1',
    title: 'Data Pre-processing Graded Quiz 1 & 2 Available',
    description: 'Graded Quiz 1 & 2 are available only after completing all materials in Week 1 & 2 respectively. No deadline has been announced yet, but it is recommended to complete it at the earliest. If you are unable to see it, please attempt practice quizzes again, it will be visble.',
  },
];

export const apexUpdates: ApexUpdate[] = [
  {
    id: 'update-1',
    title: 'Registration Closed',
    titleLink: '',
    description: `
      <p>Team registration for Advanced Apex Project 1 is now closed. The deadline was 26/09/2025 (FRI) 10:00AM.</p>
      <p class="mt-2"><strong>To Find Project Details:</strong> Navigate to the 'Progress' tab. Hover over the project section to find and download the PDF with all the information.</p>
    `,
  },
];

export const subjects: Subject[] = [
  {
    id: "dvs",
    name: "Data Visualization and Storytelling",
    icon: "BarChartBig",
    totalChapters: 13,
    completedChapters: 2,
    evaluationCriteria: "Evaluation criteria to be updated.",
  },
  {
    id: "fe",
    name: "Feature Engineering",
    icon: "Cog",
    totalChapters: 8,
    completedChapters: 2,
    evaluationCriteria: "1 Quiz (20%; W4) , Assignment (40%; W5-W7) & Trimester Exam (40%)",
  },
  {
    id: "dp",
    name: "Data Pre-processing",
    icon: "Filter",
    totalChapters: 8,
    completedChapters: 2,
    evaluationCriteria: "6 Quizes - 60% (10% each quiz) & Trimester Exam - 40% ",
    slidesUrl: "https://drive.google.com/drive/u/3/folders/1z2k6AZuzAt6vt7AHj9PNUDo-HpY7o7WS",
  },
  {
    id: "smi",
    name: "Statistical Modelling and Inferencing",
    icon: "Sigma",
    totalChapters: 13,
    completedChapters: 2,
    evaluationCriteria: "3 Quizzes (45%; W3, W6, W11), Assignment (20%; W10), Trimester Exam (35%)",
  },
  {
    id: "dsp",
    name: "Data Stores and Pipelines",
    icon: "Database",
    totalChapters: 13,
    completedChapters: 2,
    evaluationCriteria: "3 Quizzes (25%; W4, W8, W13), 2 Assignmens (40%; W5, W9),Trimester Exam - 35%",
  },
  {
    id: "aap",
    name: "Advanced Apex Project I",
    icon: "Rocket",
    totalChapters: 2,
    completedChapters: 2,
    evaluationCriteria: "Evaluation criteria to be updated.",
    projectDetailsUrl: "https://drive.google.com/drive/folders/1xhZZmYmC2vTwnKvaJj0MQJxnk3j1i5wz?usp=sharing",
  },
];

export const currentSessions: Session[] = [
  {
    id: "session-1",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-09-19T18:30:00+05:30"),
    endTime: new Date("2025-09-19T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/94455755263",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6727/topics/7239",
  },
  {
    id: "session-2",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-09-19T19:30:00+05:30"),
    endTime: new Date("2025-09-19T20:30:00+05:30"),
    joinUrl: "https://zoom.us/j/96047659647",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6726/topics/7240",
  },
  {
    id: "session-3",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-09-19T20:30:00+05:30"),
    endTime: new Date("2025-09-19T21:30:00+05:30"),
    joinUrl: "https://zoom.us/j/96428093403",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6725/topics/7238",
  },
  {
    id: "session-4",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-09-20T18:30:00+05:30"),
    endTime: new Date("2025-09-20T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/94455755263",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6724/topics/7489",
  },
  {
    id: "session-5",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-09-20T19:30:00+05:30"),
    endTime: new Date("2025-09-20T20:30:00+05:30"),
    joinUrl: "https://zoom.us/j/96047659647",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6728/topics/7490",
  },
  {
    id: "session-6",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-09-20T20:30:00+05:30"),
    endTime: new Date("2025-09-20T21:30:00+05:30"),
    joinUrl: "https://zoom.us/j/96428093403",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l.le/lessons/6732/topics/7488",
  },
  {
    id: "session-7",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-09-26T18:30:00+05:30"),
    endTime: new Date("2025-09-26T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/95028876403",
    recordingUrl: "#",
  },
  {
    id: "session-8",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-09-26T19:40:00+05:30"),
    endTime: new Date("2025-09-26T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/97724996046",
    recordingUrl: "#",
  },
  {
    id: "session-9",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-09-26T20:50:00+05:30"),
    endTime: new Date("2025-09-26T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/96848846105",
    recordingUrl: "#",
  },
  {
    id: "session-10",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-09-27T18:30:00+05:30"),
    endTime: new Date("2025-09-27T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/94184811733",
    recordingUrl: "#",
  },
  {
    id: "session-41",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-09-27T19:40:00+05:30"),
    endTime: new Date("2025-09-27T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/94514953897",
    recordingUrl: "#",
  },
  {
    id: "session-11",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-09-27T20:50:00+05:30"),
    endTime: new Date("2025-09-27T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/96823579750",
    recordingUrl: "#",
  },
  {
    id: "session-12",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-03T18:30:00+05:30"),
    endTime: new Date("2025-10-03T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-13",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-03T19:30:00+05:30"),
    endTime: new Date("2025-10-03T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-14",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-03T20:30:00+05:30"),
    endTime: new Date("2025-10-03T21:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-15",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-04T18:30:00+05:30"),
    endTime: new Date("2025-10-04T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-16",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-04T19:30:00+05:30"),
    endTime: new Date("2025-10-04T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-17",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-17T18:30:00+05:30"),
    endTime: new Date("2025-10-17T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-18",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-17T19:30:00+05:30"),
    endTime: new Date("2025-10-17T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-19",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-17T20:30:00+05:30"),
    endTime: new Date("2025-10-17T21:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-20",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-18T18:30:00+05:30"),
    endTime: new Date("2025-10-18T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-21",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-18T19:30:00+05:30"),
    endTime: new Date("2025-10-18T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-22",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-24T18:30:00+05:30"),
    endTime: new Date("2025-10-24T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-23",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-24T19:30:00+05:30"),
    endTime: new Date("2025-10-24T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-24",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-17T20:30:00+05:30"),
    endTime: new Date("2025-10-17T21:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-25",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-18T18:30:00+05:30"),
    endTime: new Date("2025-10-18T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-26",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-18T19:30:00+05:30"),
    endTime: new Date("2025-10-18T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-27",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-24T18:30:00+05:30"),
    endTime: new Date("2025-10-24T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-28",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-24T19:30:00+05:30"),
    endTime: new Date("2025-10-24T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-29",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-24T20:30:00+05:30"),
    endTime: new Date("2025-10-24T21:50:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-30",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-25T18:30:00+05:30"),
    endTime: new Date("2025-10-25T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-31",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-25T19:30:00+05:30"),
    endTime: new Date("2025-10-25T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-32",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-31T18:30:00+05:30"),
    endTime: new Date("2025-10-31T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-33",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-31T19:30:00+05:30"),
    endTime: new Date("2025-10-31T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-34",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-31T20:30:00+05:30"),
    endTime: new Date("2025-10-31T21:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-35",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-11-01T18:30:00+05:30"),
    endTime: new Date("2025-11-01T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-36",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-11-01T19:30:00+05:30"),
    endTime: new Date("2025-11-01T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-37",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-11-07T18:30:00+05:30"),
    endTime: new Date("2025-11-07T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-38",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-11-07T19:30:00+05:30"),
    endTime: new Date("2025-11-07T20:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-39",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-11-07T20:30:00+05:30"),
    endTime: new Date("2025-11-07T21:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
  {
    id: "session-40",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-11-08T18:30:00+05:30"),
    endTime: new Date("2025-11-08T19:30:00+05:30"),
    joinUrl: "#",
    recordingUrl: "#",
  },
];

    
