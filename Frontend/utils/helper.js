import { toast } from "react-toastify";

export const getDiscount = (originalPrice, discountedPrice) =>
  (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(2);

export const notify = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
