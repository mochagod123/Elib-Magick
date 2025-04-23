function showToast(message) {
    let container = document.getElementById("toast-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      Object.assign(container.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: "9999",
      });
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.textContent = message;

    Object.assign(toast.style, {
      backgroundColor: "#333",
      color: "#fff",
      padding: "16px 24px",
      borderRadius: "8px",
      opacity: "0",
      transform: "translateY(20px)",
      transition: "opacity 0.5s, transform 0.5s",
      minWidth: "200px",
    });

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => container.removeChild(toast), 500);
    }, 5000);
}