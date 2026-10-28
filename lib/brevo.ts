import "server-only";

export async function addContactToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") throw new Error("BREVO_API_KEY is not configured");
    console.info(`[brevo:dev] Would add ${email} to the news and updates list`);
    return;
  }

  const listId = Number(process.env.BREVO_JOIN_LIST_ID);
  if (!Number.isSafeInteger(listId) || listId < 1) {
    throw new Error("BREVO_JOIN_LIST_ID must be a positive integer");
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo contact sync failed with HTTP ${response.status}: ${detail}`);
  }
}
