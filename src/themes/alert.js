import Swal from "sweetalert2";

const Alert = {
  success: (message) => {
    Swal.fire({
      title: "Thành công!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      position: "top",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm",
      },
      didOpen: () => {
        const confirmButton = document.querySelector(".swal2-confirm");
        confirmButton.style.backgroundColor = "#05518B";
        const popup = document.querySelector(".swal2-popup");
        popup.style.fontSize = "14px";
        popup.style.fontFamily = "Arial, sans-serif";

      },
    });
  },

  error: (message) => {
    Swal.fire({
      title: "Lỗi!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      position: "top",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm",
      },
      didOpen: () => {
        const confirmButton = document.querySelector(".swal2-confirm");
        confirmButton.style.backgroundColor = "#05518B";
        const popup = document.querySelector(".swal2-popup");
        popup.style.fontSize = "14px";
        popup.style.fontFamily = "Arial, sans-serif";

      },
    });
  },

  warning: (message) => {
    Swal.fire({
      title: "Cảnh báo!",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
      position: "top",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm",
      },
      didOpen: () => {
        const confirmButton = document.querySelector(".swal2-confirm");
        confirmButton.style.backgroundColor = "#05518B";
        const popup = document.querySelector(".swal2-popup");
        popup.style.fontSize = "14px";
        popup.style.fontFamily = "Arial, sans-serif";

      },
    });
  },

  info: (message) => {
    Swal.fire({
      title: "Thông báo!",
      text: message,
      icon: "info",
      confirmButtonText: "OK",
      position: "top",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm",
      },
      didOpen: () => {
        const confirmButton = document.querySelector(".swal2-confirm");
        confirmButton.style.backgroundColor = "#05518B";
        const popup = document.querySelector(".swal2-popup");
        popup.style.fontSize = "14px";
        popup.style.fontFamily = "Arial, sans-serif";

      },
    });
  },
};

export default Alert;
