import type { OpenHouse } from "@/lib/listings";

function toICSDate(date: string, time: string): string {
  // 2026-05-23 + 14:00 -> 20260523T140000
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildOpenHouseICS({
  open,
  uid,
  title,
  address,
}: {
  open: OpenHouse;
  uid: string;
  title: string;
  address: string;
}): string {
  const dtStart = toICSDate(open.date, open.startTime);
  const dtEnd = toICSDate(open.date, open.endTime);
  const summary = escapeText(`Open house: ${title}`);
  const location = escapeText(address);
  const description = escapeText(open.notes ?? "Open house viewing.");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Riley Avery//Open House//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStart}`,
    `DTSTART;TZID=America/Toronto:${dtStart}`,
    `DTEND;TZID=America/Toronto:${dtEnd}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function icsDataUri(ics: string): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
