import { useEffect, useState } from "react";
import { raindropRequest } from "./raindrop";

export function useTags() {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    raindropRequest("/tags").then((res: any) => {
      setTags(
        res.items.map((item: any) => ({
          id: item._id,
          name: item._id,
        }))
      );
    });
  }, []);

  return tags;
}
