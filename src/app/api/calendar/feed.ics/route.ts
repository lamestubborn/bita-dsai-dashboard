import { NextResponse } from 'next/server';
import { currentSessions } from '@/lib/data';

// Function to format a date for iCalendar in a specific timezone, e.g., 20240101T120000
const formatICalDate = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
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

  // All dates in lib/data.ts are parsed as local time.
  // When deploying to a server, we need to ensure the server's timezone is set correctly,
  // or handle timezones more explicitly here. For now, we assume local is IST.
  const events = currentSessions.map(session => {
    const event = [
      'BEGIN:VEVENT',
      `UID:${session.id}@bits-dsai-dashboard.app`,
      // Use a UTC timestamp for DTSTAMP
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
      `DTSTART;TZID=Asia/Kolkata:${formatICalDate(session.startTime)}`,
      `DTEND;TZID=Asia/Kolkata:${formatICalDate(session.endTime)}`,
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
      'Content-Disposition': 'attachment; filename="bits_dsai_sessions.ics"',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
