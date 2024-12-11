chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "autofill") {
      // Logic for autofill
    }
  });
  