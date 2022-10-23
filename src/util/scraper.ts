import { useState, useEffect } from "react";
import ogs from "ts-open-graph-scraper";

export function useOpenGraph(url: string) {
  const [og, setOg] = useState<{ title?: string; description?: string } | null>(
    null
  );

  useEffect(() => {
    ogs({ url })
      .then((res) => {
        setOg({
          title: res?.ogTitle,
          description: Array.isArray(res?.ogDescription)
            ? res?.ogDescription[0]
            : res?.ogDescription,
        });
      })
      .catch(() => {
        setOg({ title: "", description: "" });
      });
  }, [url]);

  return og;
}
