'use server';

import { currentSessions, subjects } from './data';

export const dynamic = 'force-dynamic';

export const getCurrentSessions = () => currentSessions;
export const getSubjects = () => subjects;
