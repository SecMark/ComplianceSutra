import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayNotification = ({ title, body }) => {
  toast.success(`${title}${body}`, { toastId: "1" });

  return <ToastContainer />;
};

export default DisplayNotification;
