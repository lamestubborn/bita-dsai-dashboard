import { NextResponse } from 'next/server';
import { currentSessions } from '@/lib/data';

// Function to format a date for iCalendar, e.g., 20240101T120000Z
const formatICalDate = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export async function GET() {
  const calHeader = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BITS MSc DSAI Dashboard//Your Study Companion//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-PUBLISHED-TTL:PT1H',
    'X-WR-CALNAME:BITS MSc DSAI Sessions',
    'X-WR-TIMEZONE:UTC',
  ];

  const calFooter = ['END:VCALENDAR'];

  const events = currentSessions.map(session => {
    const event = [
      'BEGIN:VEVENT',
      `UID:${session.id}@studypulse.app`,
      `DTSTAMP:${formatICalDate(new Date())}`,
      `DTSTART:${formatICalDate(session.startTime)}`,
      `DTEND:${formatICalDate(session.endTime)}`,
      `SUMMARY:${session.title}`,
      `DESCRIPTION:Subject: ${session.subject}\\nJoin your session here: ${session.joinUrl}`,
      'END:VEVENT',
    ];
    return event.join('\r\n');
  });

  const calBody = [ ...calHeader, ...events, ...calFooter ].join('\r\n');

  return new NextResponse(calBody, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="studypulse_sessions.ics"',
    },
  });
}
