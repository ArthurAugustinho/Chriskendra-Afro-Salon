// Shared by the build (hours table, JSON-LD) and the browser (open/closed status).

export interface DayHours {
  day: string;
  open?: string;
  close?: string;
}

export const toMinutes = (hhmm: string): number => {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "09:30" -> "9:30am", "18:00" -> "6pm" (UK salon style). */
export const formatTime = (hhmm: string): string => {
  const minutes = toMinutes(hhmm);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h < 12 ? "am" : "pm";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
};

export const formatRange = (d: DayHours): string =>
  d.open && d.close ? `${formatTime(d.open)} – ${formatTime(d.close)}` : "Closed";

/**
 * Status text for a week of hours (Monday first) at a given weekday (0 = Monday)
 * and minute of the day, both already in Europe/London time.
 */
export const describeStatus = (
  week: DayHours[],
  weekday: number,
  minute: number,
): { open: boolean; text: string } => {
  const today = week[weekday];
  if (today?.open && today.close) {
    if (minute >= toMinutes(today.open) && minute < toMinutes(today.close)) {
      return { open: true, text: `Open now until ${formatTime(today.close)}` };
    }
    if (minute < toMinutes(today.open)) {
      return { open: false, text: `Closed now. Opens today at ${formatTime(today.open)}` };
    }
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = week[(weekday + ahead) % 7];
    if (next?.open) {
      const when = ahead === 1 ? "tomorrow" : next.day;
      return { open: false, text: `Closed now. Opens ${when} at ${formatTime(next.open)}` };
    }
  }
  return { open: false, text: "Closed now" };
};
