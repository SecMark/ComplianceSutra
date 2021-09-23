let url = "";

if (window.location.href.includes("localhost")) {
  url = "http://20.193.231.218:8002/";
} else if (window.location.href.includes("139.162.5.110")) {
  url = "http://audit.capmtech.com/";
} else {
  url = "http://brainmidas.com/";
}

export const BACKEND_BASE_URL = url;
export const audit_url = "api/method/audit_portal.apis.";
export const audit_auth_url =
  "api/method/audit_portal.apis.authentication.api.";
export const test_customization_url = "api/method/test_customization.apis.cs1.";
