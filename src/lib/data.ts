import type { LucideIcon } from "lucide-react";
import { Book, FlaskConical, Laptop, Mic2 } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
  totalChapters: number;
  completedChapters: number;
}

export interface Session {
  id: string;
  title: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  joinUrl: string;
}

export interface PastSession {
  id:string;
  subject: string;
  date: Date;
  joinUrl: string;
  recordingUrl?: string;
}

export const subjects: Subject[] = [
  {
    id: "math101",
    name: "Algebra Basics",
    icon: Book,
    totalChapters: 12,
    completedChapters: 8,
  },
  {
    id: "chem202",
    name: "Organic Chemistry",
    icon: FlaskConical,
    totalChapters: 15,
    completedChapters: 5,
  },
  {
    id: "cs301",
    name: "Data Structures",
    icon: Laptop,
    totalChapters: 10,
    completedChapters: 9,
  },
  {
    id: "comm101",
    name: "Public Speaking",
    icon: Mic2,
    totalChapters: 8,
    completedChapters: 2,
  },
];

const now = new Date();

export const currentSessions: Session[] = [
  {
    id: "session-1",
    title: "Solving Linear Equations",
    subject: "Algebra Basics",
    startTime: new Date(new Date().setDate(now.getDate() + 1)),
    endTime: new Date(new Date().setDate(now.getDate() + 1)),
    joinUrl: "#",
  },
  {
    id: "session-2",
    title: "Introduction to Alkanes",
    subject: "Organic Chemistry",
    startTime: new Date(new Date().setDate(now.getDate() + 2)),
    endTime: new Date(new Date().setDate(now.getDate() + 2)),
    joinUrl: "#",
  },
  {
    id: "session-3",
    title: "Big O Notation",
    subject: "Data Structures",
    startTime: new Date(new Date().setDate(now.getDate() + 3)),
    endTime: new Date(new Date().setDate(now.getDate() + 3)),
    joinUrl: "#",
  },
];

export const previousSessions: PastSession[] = [
    {
        id: "prev-session-1",
        subject: "Algebra Basics",
        date: new Date(new Date().setDate(now.getDate() - 7)),
        joinUrl: "#",
        recordingUrl: "#",
    },
    {
        id: "prev-session-2",
        subject: "Data Structures",
        date: new Date(new Date().setDate(now.getDate() - 5)),
        joinUrl: "#",
    },
    {
        id: "prev-session-3",
        subject: "Organic Chemistry",
        date: new Date(new Date().setDate(now.getDate() - 3)),
        joinUrl: "#",
        recordingUrl: "#",
    },
    {
        id: "prev-session-4",
        subject: "Public Speaking",
        date: new Date(new Date().setDate(now.getDate() - 2)),
        joinUrl: "#",
    }
]
