import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayNotification = ({ title, body }) => {
  toast.success(<Display />, { autoClose: 10000 });
  function Display() {
    return (
      <div>
        <p>{title}</p>
        <p>{body}</p>
      </div>
    );
  }
  return <ToastContainer />;
};

export default DisplayNotification;
