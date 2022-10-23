import { runAppleScriptSync } from "run-applescript";

export function getInfoFromBrowser() {
  const errorMessage = "Browser not detected";

  // TODO: can we automatically get the URL from the frontmost browser without applescript?
  const result = runAppleScriptSync(`
    tell application "System Events" to set frontApp to name of first process whose frontmost is true

    if (frontapp starts with "Google Chrome") or (frontApp starts with "Chromium") or (frontApp starts with "Opera") or (frontApp starts with "Vivaldi") or (frontApp starts with "Brave Browser") or (frontApp starts with "Microsoft Edge") then
      using terms from application "Google Chrome"
        tell application frontApp to set currentTabTitle to title of active tab of front window
        tell application frontApp to set currentTabUrl to URL of active tab of front window
      end using terms from
    else if (frontApp starts with "Safari") or (frontApp starts with "Webkit") then
      using terms from application "Safari"
        tell application frontApp to set currentTabTitle to name of front document
        tell application frontApp to set currentTabUrl to URL of front document
      end using terms from
    else
      return "${errorMessage}"
    end if

    return currentTabUrl & "\n" & currentTabTitle
  `);

  if (result === errorMessage) {
    return { url: "", title: "", error: errorMessage };
  }

  const [url, title] = result.split("\n");
  return { url, title, error: undefined };
}
