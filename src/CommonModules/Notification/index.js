import { useEffect, useState } from "react";
import axiosInstance from "../../apiServices";
import { getToken } from "../../firebaseConfig/firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);
  localStorage.setItem("deviceToken", "");
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        localStorage.setItem("deviceToken", data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);
  return <></>;
};
export default Notifications;
