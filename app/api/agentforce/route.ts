import { NextResponse } from "next/server";

const BASE_URL = process.env.SF_BASE_URL;
const SF_DOMAIN = process.env.SF_DOMAIN;
const SF_AGENT_ID = process.env.SF_AGENT_ID;

async function getAccessToken() {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SF_CLIENT_ID!,
    client_secret: process.env.SF_CLIENT_SECRET!,
  });

  try {
    const response = await fetch(`${SF_DOMAIN}/services/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, ...data } = body;

  try {
    // Get fresh access token
    const accessToken = await getAccessToken();

    let url = "";
    if (action === "createSession") {
      url = `${BASE_URL}/agents/${SF_AGENT_ID}/sessions`;
      // Ensure sessionData includes the endpoint in instanceConfig
      if (data.sessionData?.instanceConfig) {
        data.sessionData.instanceConfig.endpoint = SF_DOMAIN;
      }
    } else if (action === "sendMessage") {
      url = `${BASE_URL}/sessions/${data.sessionId}/messages`;
    }

    console.log("Request URL:", url);
    console.log("Request Body:", JSON.stringify(data, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(
        action === "createSession"
          ? {
              ...data.sessionData,
              instanceConfig: {
                endpoint: SF_DOMAIN,
              },
            }
          : { message: data.message }
      ),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
