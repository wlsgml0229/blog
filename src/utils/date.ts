export const currentTime = () => {
  return new Date().toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
