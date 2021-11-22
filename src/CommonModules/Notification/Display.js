import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayNotification = ({ title, body, data }) => {
  console.log(data);
  toast.info(<Custome />, { toastId: 1 });

  function Custome() {
    return (
      <div>
        <h6>{title}</h6>
        <p style={{ color: "#000000", margin: "0", padding: "0" }}>{body}</p>
        <a href="/new-regulations">view more</a>
      </div>
    );
  }
  return <ToastContainer />;
};

export default DisplayNotification;
