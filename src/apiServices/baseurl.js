let url = "";

if (window.location.href.includes("localhost")) {
  url = "https://staging.compliancesutra.com/api/method/";
} else if (window.location.href.includes("139.162.5.110")) {
  url = "http://audit.capmtech.com/";
} else {
  url = "http://brainmidas.com/";
}

export const BACKEND_BASE_URL = url;
