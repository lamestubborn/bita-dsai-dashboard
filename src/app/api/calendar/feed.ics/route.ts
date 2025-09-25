
import { NextResponse } from 'next/server';
import { currentSessions } from '@/lib/data';

// Force the route to be dynamic
export const dynamic = 'force-dynamic';

// Function to format a date for iCalendar in a specific timezone, e.g., 20240101T120000
const formatICalDate = (date: Date): string => {
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

  // The dates in lib/data.ts are parsed with a specific timezone offset (+05:30),
  // so they represent a correct point in time.
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
