let url = "";

if (window.location.href.includes("localhost")) {
  url = "https://dev.compliancesutra.com/api/method/";
} else if (window.location.href.includes("http://52.172.231.19/")) {
  url = "https://dev.compliancesutra.com/api/method/";
} else {
  url = "https://dev.compliancesutra.com/api/method/";
}

export const BACKEND_BASE_URL = url;
