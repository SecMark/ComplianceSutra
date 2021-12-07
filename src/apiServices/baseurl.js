let url = "";

if (window.location.href.includes("localhost")) {
  url = "https://dev.compliancesutra.com/api/method/"; //For development
} else {
  url = "https://staging.compliancesutra.com/api/method/"; // For Production
}

export const BACKEND_BASE_URL = url;
