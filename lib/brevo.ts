import "server-only";

export function brevoApiKey() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey && process.env.NODE_ENV === "production") throw new Error("BREVO_API_KEY is not configured");
  return apiKey;
}

export async function brevoRequest(path: string, apiKey: string, body: unknown) {
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo ${path} failed with HTTP ${response.status}: ${detail}`);
  }
}

export async function addContactToBrevo(email: string) {
  const apiKey = brevoApiKey();
  if (!apiKey) {
    console.info(`[brevo:dev] Would add ${email} to the news and updates list`);
    return;
  }

  const listId = Number(process.env.BREVO_JOIN_LIST_ID);
  if (!Number.isSafeInteger(listId) || listId < 1) {
    throw new Error("BREVO_JOIN_LIST_ID must be a positive integer");
  }

  await brevoRequest("/contacts", apiKey, { email, listIds: [listId], updateEnabled: true });
}
