if ("serviceWorker" in navigator) {
  window.addEventListener(
    "DOMContentLoaded",
    () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" });
    },
    { once: true },
  );
}
