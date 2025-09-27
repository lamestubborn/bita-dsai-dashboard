'use server';

import { currentSessions, subjects } from './data';

export const getCurrentSessions = async () => currentSessions;
export const getSubjects = async () => subjects;
