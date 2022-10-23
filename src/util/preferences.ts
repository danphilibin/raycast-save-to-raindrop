import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  raindropToken: string;
}

export default function getPreference(key: keyof Preferences): string {
  const preferences = getPreferenceValues<Preferences>();
  return preferences[key];
}
