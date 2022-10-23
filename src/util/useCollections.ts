import { useEffect, useState } from "react";
import { raindropRequest } from "./raindrop";

export function useCollections() {
  const [collections, setCollections] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    raindropRequest("/collections").then((res: any) => {
      setCollections(
        res.items.map((item: any) => ({
          id: item._id,
          title: item.title,
        }))
      );
    });
  }, []);

  return collections;
}
