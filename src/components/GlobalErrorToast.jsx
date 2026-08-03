import { useEffect, useRef, useState } from "react";
import { errorBus } from "../utils/errorBus";

const GlobalErrorToast = () => {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = errorBus.subscribe((msg) => {
      setMessage(msg);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMessage(null), 4000);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm max-w-[90%] text-center">
      {message}
    </div>
  );
};

export default GlobalErrorToast;