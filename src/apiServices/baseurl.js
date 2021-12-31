let url = "";

if (window.location.href.includes("localhost")) {
  url = "https://dev.compliancesutra.com/api/method/"; //For development
} else if (window.location.href.includes("csutraapp-dev.azurewebsites.net")) {
  url = "https://dev.compliancesutra.com/api/method/"; //For development
} else if (
  window.location.href.includes("https://csutraapp-cdemo.azurewebsites.net")
) {
  url = "https://20.198.68.148/api/method/"; //For demo
} else {
  url = "https://prd.compliancesutra.com/api/method/"; // For Production
}

export const BACKEND_BASE_URL = url;
