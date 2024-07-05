export async function get() {
  const apiKey = "e650fd6d1ae2872bd20499f9ba3fbb83";
  const apiBaseUrl = "https://app-rssi-api-sea-dev.azurewebsites.net";
  const earthDataApiUrl = `${apiBaseUrl}/api/earthdata/ncei`;
  const solarWindDataApiUrl = `${apiBaseUrl}/api/satellitedata/dscovr`;

  let earthData = {};
  let solarWindData = {};

  async function fetchEarthData() {
    const response = await fetch(earthDataApiUrl, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async function fetchSolarWindData() {
    const response = await fetch(solarWindDataApiUrl, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  try {
    earthData = await fetchEarthData();
    solarWindData = await fetchSolarWindData();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: 500,
      body: { error: "Error fetching data" },
    };
  }

  const magneticReconnection = Math.abs(earthData.vertical + solarWindData.bzGSM) <= 1000 && solarWindData.bzGSM < 0;

  return {
    status: 200,
    body: { magneticReconnection },
  };
}
