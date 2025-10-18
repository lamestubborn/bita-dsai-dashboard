
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

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  startDate: Date;
  dueDate: Date;
  link: string;
  weightage?: string;
}

export const quizzes: Quiz[] = [
  {
    id: 'fe-quiz-1-week-3',
    title: 'Graded Quiz 1',
    subject: 'Feature Engineering',
    startDate: new Date('2025-10-10T00:00:00+05:30'),
    dueDate: new Date('2025-10-12T23:59:59+05:30'),
    link: 'https://lumen.bitspilani-digital.edu.in/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6726&qi=4085&cfql=0',
    weightage: '20%'
  },
  {
    id: 'dsp-quiz-1',
    title: 'Graded Quiz #1',
    subject: 'Data Stores & Pipelines',
    startDate: new Date('2025-10-11T00:00:00+05:30'),
    dueDate: new Date('2025-10-13T23:59:00+05:30'),
    link: 'https://lumen.bitspilani-digital.edu.in/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6728&qi=4084&cfql=0',
    weightage: '8%'
  },
  {
    id: 'dp-quiz-week-4',
    title: 'Quiz 2 - Week 4',
    subject: 'Data Pre-processing',
    startDate: new Date('2025-10-11T00:00:00+05:30'),
    dueDate: new Date('2025-10-14T23:59:59+05:30'),
    link: 'https://lumen.bitspilani-digital.edu.in/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6725&qi=3647&cfql=0',
    weightage: '10%'
  },
   {
    id: 'smi-quiz-1-past',
    title: 'Quiz 1',
    subject: 'Statistical Modelling and Inferencing',
    startDate: new Date('2025-09-28T00:00:00+05:30'),
    dueDate: new Date('2025-10-06T23:59:59+05:30'),
    link: '#',
    weightage: '15%'
  },
   {
    id: 'dpp-quiz-1-past',
    title: 'Quiz 1- Week2',
    subject: 'Data Pre-processing',
    startDate: new Date('2025-09-21T00:00:00+05:30'),
    dueDate: new Date('2025-10-06T23:59:59+05:30'),
    link: '#',
    weightage: '10%'
  },
];


export const importantUpdates: ImportantUpdate[] = [];

export const subjects: Subject[] = [
  {
    id: "dvs",
    name: "Data Visualization and Storytelling",
    icon: "BarChartBig",
    totalChapters: 13,
    completedChapters: 4,
    evaluationCriteria: "Evaluation criteria to be updated.",
  },
  {
    id: "fe",
    name: "Feature Engineering",
    icon: "Cog",
    totalChapters: 8,
    completedChapters: 4,
    evaluationCriteria: "1 Quiz (20%; W4) , Assignment (40%; W5-W7) & Trimester Exam (40%)",
  },
  {
    id: "dp",
    name: "Data Pre-processing",
    icon: "Filter",
    totalChapters: 8,
    completedChapters: 4,
    evaluationCriteria: "6 Quizes - 60% (10% each quiz) & Trimester Exam - 40% ",
    slidesUrl: "https://drive.google.com/drive/u/3/folders/1z2k6AZuzAt6vt7AHj9PNUDo-HpY7o7WS",
  },
  {
    id: "smi",
    name: "Statistical Modelling and Inferencing",
    icon: "Sigma",
    totalChapters: 13,
    completedChapters: 4,
    evaluationCriteria: "3 Quizzes (45%; W3, W6, W11), Assignment (20%; W10), Trimester Exam (35%)",
  },
  {
    id: "dsp",
    name: "Data Stores and Pipelines",
    icon: "Database",
    totalChapters: 13,
    completedChapters: 4,
    evaluationCriteria: "3 Quizzes (25%; W4, W8, W13), 2 Assignmens (40%; W5, W9),Trimester Exam - 35%",
  },
  {
    id: "aap",
    name: "Advanced Apex Project I",
    icon: "Rocket",
    totalChapters: 5,
    completedChapters: 4,
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
    recordingUrl: "https://studio.firebase.google.com/studio-278254813",
  },
  {
    id: "session-8",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-09-26T19:40:00+05:30"),
    endTime: new Date("2025-09-26T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/97724996046",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6726/topics/8548",
  },
  {
    id: "session-9",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-09-26T20:50:00+05:30"),
    endTime: new Date("2025-09-26T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/96848846105",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6724/topics/8550",
  },
  {
    id: "session-10",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-09-27T18:30:00+05:30"),
    endTime: new Date("2025-09-27T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/94184811733",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6725/topics/8549",
  },
  {
    id: "session-41",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-09-27T19:40:00+05:30"),
    endTime: new Date("2025-09-27T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/94514953897",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6732/topics/8545",
  },
  {
    id: "session-11",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-09-27T20:50:00+05:30"),
    endTime: new Date("2025-09-27T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/96823579750",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6728/topics/8546",
  },
  {
    id: "session-12",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-03T18:30:00+05:30"),
    endTime: new Date("2025-10-03T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/97656969793",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6727/topics/8777",
  },
  {
    id: "session-14",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-03T20:50:00+05:30"),
    endTime: new Date("2025-10-03T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/97393124402",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6724/topics/8775",
  },
  {
    id: "session-15",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-04T18:30:00+05:30"),
    endTime: new Date("2025-10-04T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/99072201356",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6725/topics/8791",
  },
  {
    id: "session-42",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-10-04T19:40:00+05:30"),
    endTime: new Date("2025-10-04T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/96368782363",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6732/topics/8792",
  },
  {
    id: "session-16",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-04T20:50:00+05:30"),
    endTime: new Date("2025-10-04T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/91314191875",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6728/topics/8793",
  },
  {
    id: "session-fe-rescheduled",
    title: "Feature Engineering- Week 3 Rescheduled",
    subject: "Feature Engineering- Week 3 Rescheduled",
    startTime: new Date("2025-10-07T19:40:00+05:30"),
    endTime: new Date("2025-10-07T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/99792901043",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6726/topics/9117",
  },
  {
    id: "session-dvs-oct-10",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-10T18:30:00+05:30"),
    endTime: new Date("2025-10-10T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/97625555370",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6727/topics/9173",
  },
  {
    id: "session-fe-oct-10",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-10T19:40:00+05:30"),
    endTime: new Date("2025-10-10T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/92860794895",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6726/topics/9174",
  },
  {
    id: "session-dsp-oct-10",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-10T20:50:00+05:30"),
    endTime: new Date("2025-10-10T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/92063819149",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6728/topics/9172",
  },
  {
    id: "session-dp-oct-11",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-11T18:30:00+05:30"),
    endTime: new Date("2025-10-11T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/95764273373",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6725/topics/9175",
  },
  {
    id: "session-aap-oct-11",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-10-11T19:40:00+05:30"),
    endTime: new Date("2025-10-11T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/96009483570",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6732/topics/9171",
  },
  {
    id: "session-smi-oct-11",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-11T20:50:00+05:30"),
    endTime: new Date("2025-10-11T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/98605093627",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6724/topics/9176",
  },
  {
    id: "session-17",
    title: "Data Visualization and Storytelling",
    subject: "Data Visualization and Storytelling",
    startTime: new Date("2025-10-17T18:30:00+05:30"),
    endTime: new Date("2025-10-17T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/92417554167",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6727/topics/9493",
  },
  {
    id: "session-18",
    title: "Feature Engineering",
    subject: "Feature Engineering",
    startTime: new Date("2025-10-17T19:40:00+05:30"),
    endTime: new Date("2025-10-17T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/93813338012",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6726/topics/9494",
  },
  {
    id: "session-19",
    title: "Statistical Modelling and Inferencing",
    subject: "Statistical Modelling and Inferencing",
    startTime: new Date("2025-10-17T20:50:00+05:30"),
    endTime: new Date("2025-10-17T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/98088271158",
    recordingUrl: "https://lumen.bitspilani-digital.edu.in/d2l/le/lessons/6724/topics/9495",
  },
  {
    id: "session-20",
    title: "Data Pre-processing",
    subject: "Data Pre-processing",
    startTime: new Date("2025-10-18T18:30:00+05:30"),
    endTime: new Date("2025-10-18T19:30:00+05:30"),
    joinUrl: "https://zoom.us/j/93720459681",
    recordingUrl: "#",
  },
  {
    id: "session-21",
    title: "Data Stores and Pipelines",
    subject: "Data Stores and Pipelines",
    startTime: new Date("2025-10-18T20:50:00+05:30"),
    endTime: new Date("2025-10-18T21:50:00+05:30"),
    joinUrl: "https://zoom.us/j/95153652675",
    recordingUrl: "#",
  },
  {
    id: "session-aap-oct-18",
    title: "Advanced Apex Project I",
    subject: "Advanced Apex Project I",
    startTime: new Date("2025-10-18T19:40:00+05:30"),
    endTime: new Date("2025-10-18T20:40:00+05:30"),
    joinUrl: "https://zoom.us/j/96042626338",
    recordingUrl: "#",
  },
];

    
    

    













    