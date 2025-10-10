
import { currentSessions, subjects, importantUpdates, quizzes } from './data';

export const getCurrentSessions = async () => currentSessions;
export const getSubjects = async () => subjects;
export const getImportantUpdates = async () => importantUpdates;
export const getQuizzes = async () => quizzes;
