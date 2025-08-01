import { useEffect } from "react";
export function useKey(key: string, action: () => void) {
  useEffect(
    function () {
      const callback = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() !== key.toLowerCase()) return;
        action();
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}
