import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhook } from "@/server/integrations/github/app";
import { handleWebhook } from "@/server/integrations/github/webhooks";

export async function POST(req: NextRequest) {
  const body = await req.text();
  // Signature first: nothing is parsed from an unverified delivery.
  if (!(await verifyWebhook(body, req.headers.get("x-hub-signature-256")))) {
    return new NextResponse("bad signature", { status: 401 });
  }
  const event = req.headers.get("x-github-event") ?? "";
  try {
    const result = await handleWebhook(event, JSON.parse(body));
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("webhook", event, error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
