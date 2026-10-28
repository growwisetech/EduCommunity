import "server-only";

export async function addJoinContactToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_JOIN_LIST_ID);

  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");
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
  });

  if (!response.ok) {
    throw new Error(`Brevo contact sync failed with HTTP ${response.status}`);
  }
}
