import { useEffect, useState } from "react";
import axiosInstance from "../../apiServices";
import { getToken } from "../../firebaseConfig/firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);
  console.log("Token found", isTokenFound);
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        axiosInstance.console.log("Token is", data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);
  return <></>;
};
export default Notifications;
