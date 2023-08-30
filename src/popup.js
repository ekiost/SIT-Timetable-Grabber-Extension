"use strict";

import "./popup.css";

(function () {
  document.getElementById("extractBtn").addEventListener("click", () => {
    extractTimetable();
  });

  function extractTimetable() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: "EXTRACT",
        },
        (response) => {
          console.log("Current count value passed to contentScript file");
        }
      );
    });
  }

  chrome.runtime.sendMessage(
    {
      type: "GREETINGS",
      payload: {
        message: "Hello, my name is Pop. I am from Popup.",
      },
    },
    (response) => {
      console.log(response.message);
    }
  );
})();
