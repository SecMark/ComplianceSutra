let url = "";

if (window.location.href.includes("localhost")) {
  url = "http://brainmidas.com/";
} else if (window.location.href.includes("beta.capmtech.com")) {
  url = "http://brainmidas.com/";
} else {
  url = "https://capmtech.com/";
}

export const BACKEND_BASE_URL = url;
