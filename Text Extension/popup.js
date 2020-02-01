// Update the relevant fields with the new data.
window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "DOMInfo"
      });
    }
  );
});
