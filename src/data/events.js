import { generatedEvents } from "./generatedEvents";
import { eventIcons, fallbackEventIcon } from "./eventIcons";

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function parseEventDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildEvent(record) {
  const date = parseEventDate(record.date);
  if (!date) return null;

  return {
    id: record.eventId || record.title,
    title: record.title,
    description: record.description,
    date: {
      day: String(date.getDate()).padStart(2, "0"),
      month: MONTH_LABELS[date.getMonth()]
    },
    time: record.time,
    location: record.location,
    category: record.category,
    icon: eventIcons[(record.category || "").toLowerCase()] || fallbackEventIcon,
    sortDate: date
  };
}

const today = new Date();
today.setHours(0, 0, 0, 0);

export const events = generatedEvents
  .map(buildEvent)
  .filter((event) => event && event.sortDate >= today)
  .sort((a, b) => a.sortDate - b.sortDate)
  .map(({ sortDate, ...event }) => event);
