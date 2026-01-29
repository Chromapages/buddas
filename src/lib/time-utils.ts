/**
 * Checks if the venue is currently open based on Hawaii Standard Time (HST).
 * @param opening 24h format string "HH:mm"
 * @param closing 24h format string "HH:mm"
 * @returns boolean
 */
export function isBuddaOpen(opening: string = "08:00", closing: string = "20:00"): boolean {
    const now = new Date();

    // Get current time string in Hawaii timezone (Pacific/Honolulu)
    // Hawaii doesn't observe DST, so it's always UTC-10.
    const hstString = new Intl.DateTimeFormat("en-US", {
        timeZone: "Pacific/Honolulu",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    }).format(now);

    const [hNow, mNow] = hstString.split(":").map(Number);
    const [hOpen, mOpen] = (opening || "08:00").split(":").map(Number);
    const [hClose, mClose] = (closing || "20:00").split(":").map(Number);

    const nowInMinutes = hNow * 60 + mNow;
    const openInMinutes = hOpen * 60 + mOpen;
    const closeInMinutes = hClose * 60 + mClose;

    // Normal range check (e.g. 08:00 to 20:00)
    if (openInMinutes < closeInMinutes) {
        return nowInMinutes >= openInMinutes && nowInMinutes < closeInMinutes;
    }

    // Overnight check (e.g. 20:00 to 02:00)
    return nowInMinutes >= openInMinutes || nowInMinutes < closeInMinutes;
}
