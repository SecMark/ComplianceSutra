let url = "";

if (window.location.href.includes("localhost")) {
  url = "http://20.193.231.218:8002/api/method/audit_portal.apis.";
} else if (window.location.href.includes("139.162.5.110")) {
  url = "http://audit.capmtech.com/";
} else {
  url = "http://brainmidas.com/";
}

export const BACKEND_BASE_URL = url;
