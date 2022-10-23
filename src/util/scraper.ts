import { useState, useEffect } from "react";
import ogs, { OGData } from "ts-open-graph-scraper";

export function useOpenGraph(url: string) {
  const [og, setOg] = useState<OGData | null>(null);

  useEffect(() => {
    ogs({ url }).then(setOg);
  }, [url]);

  if (!og) return null;

  return {
    title: og?.ogTitle,
    description: Array.isArray(og?.ogDescription)
      ? og?.ogDescription[0]
      : og?.ogDescription,
  };
}
