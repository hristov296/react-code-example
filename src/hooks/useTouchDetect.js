import { useEffect, useCallback, useState } from "react";

export default () => {
  if (typeof window === "undefined") {
    return;
  }
  const [isTouch, setTouch] = useState(
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  );

  const handleResize = useCallback(() => {
    setTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, [setTouch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isTouch;
};
