import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const value = {
    toast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
