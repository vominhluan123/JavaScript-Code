import { useEffect, useState } from "react";

export default function UseDebounce(Value = "", time = 1000) {
  const [debounce, setDebounce] = useState(Value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(Value);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [Value, time]);
  return debounce;
}
