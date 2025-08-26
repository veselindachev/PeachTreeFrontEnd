import "@testing-library/jest-dom";

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = String(args[0] ?? "");
  if (msg.includes("React Router Future Flag Warning")) return;
  originalWarn(...args);
};
