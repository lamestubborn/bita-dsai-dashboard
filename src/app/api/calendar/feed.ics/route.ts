
import { NextResponse } from 'next/server';
import { getCurrentSessions, getQuizzes } from '@/lib/dynamic-data';
import { addDays } from 'date-fns';

// Force the route to be dynamic
export const dynamic = 'force-dynamic';

// Function to format a date for iCalendar in a specific timezone, e.g., 20240101T120000
const formatICalDateTime = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  // Use toLocaleString to get date parts in the correct timezone
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const year = parts.find(p => p.type === 'year')?.value || '0000';
  const month = parts.find(p => p.type === 'month')?.value || '00';
  const day = parts.find(p => p.type === 'day')?.value || '00';
  const hours = parts.find(p => p.type === 'hour')?.value || '00';
  const minutes = parts.find(p => p.type === 'minute')?.value || '00';
  const seconds = parts.find(p => p.type === 'second')?.value || '00';
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};


// Function to format a date for an all-day iCalendar event, e.g., 20240101
const formatICalDate = (date: Date): string => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    // Use toLocaleString to get date parts in the correct timezone
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    
    const year = parts.find(p => p.type === 'year')?.value || '0000';
    const month = parts.find(p => p.type === 'month')?.value || '00';
    const day = parts.find(p => p.type === 'day')?.value || '00';

    return `${year}${month}${day}`;
};


export async function GET() {
  const calHeader = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BITS MSc DSAI Dashboard//Your Study Companion//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-PUBLISHED-TTL:PT1M',
    'X-WR-CALNAME:BITS MSc DSAI Calendar',
    'X-WR-TIMEZONE:Asia/Kolkata', // Set timezone to IST
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE'
  ];

  const calFooter = ['END:VCALENDAR'];

  const currentSessions = await getCurrentSessions();
  const quizzes = await getQuizzes();

  const sessionEvents = currentSessions.map(session => {
    const event = [
      'BEGIN:VEVENT',
      `UID:${session.id}@bits-dsai-dashboard.app`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
      `DTSTART;TZID=Asia/Kolkata:${formatICalDateTime(session.startTime)}`,
      `DTEND;TZID=Asia/Kolkata:${formatICalDateTime(session.endTime)}`,
      `SUMMARY:${session.title}`,
      `DESCRIPTION:Subject: ${session.subject}\\nJoin your session here: ${session.joinUrl}`,
      'END:VEVENT',
    ];
    return event.join('\r\n');
  });

  const quizEvents = quizzes.map(quiz => {
    const event = [
        'BEGIN:VEVENT',
        `UID:${quiz.id}@bits-dsai-dashboard.app`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `DTSTART;VALUE=DATE:${formatICalDate(quiz.dueDate)}`,
        `DTEND;VALUE=DATE:${formatICalDate(addDays(quiz.dueDate, 1))}`,
        `SUMMARY:DUE: ${quiz.title}`,
        `DESCRIPTION:Subject: ${quiz.subject}\\nWeightage: ${quiz.weightage || 'N/A'}\\nSubmit here: ${quiz.link}`,
        'END:VEVENT',
    ];
    return event.join('\r\n');
  });

  const allEvents = [...sessionEvents, ...quizEvents];

  const calBody = [ ...calHeader, ...allEvents, ...calFooter ].join('\r\n');

  return new NextResponse(calBody, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bits_dsai_calendar.ics"',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
