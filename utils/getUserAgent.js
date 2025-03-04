import { UAParser } from "ua-parser-js";

const GetUserAgentData = async () => {
  // Parse User-Agent
  const parser = new UAParser();
  const result = parser.getResult();

  // Extract device type and OS
  const device = result.device.type || "desktop";
  const os = result.os.name || "سایر";

  // Fetch IP address
  // let ip = "";
  // try {
  //   const response = await fetch("https://api.ipify.org?format=json");
  //   const data = await response.json();
  //   ip = data.ip;
  // } catch (error) {
  //   console.error("Failed to fetch IP address:", error);
  //   ip = "Unknown IP";
  // }

  return {
    device,
    os,
  };
};

export default GetUserAgentData;
