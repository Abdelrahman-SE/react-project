export function formatDateEn(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffInMs = now - date;

  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffInMinutes < 60) {
    if (diffInMinutes < 1) return "just now";
    return rtf.format(-diffInMinutes, "minute");
  }

  if (diffInDays === 0) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (diffInDays < 7) {
    if (diffInDays === 1) return "yesterday";
    return rtf.format(-diffInDays, "day");
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
