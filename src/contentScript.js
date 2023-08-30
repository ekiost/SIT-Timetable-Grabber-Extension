"use strict";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const titleTag = document.head.getElementsByTagName("title")[0];
if (titleTag) {
  const pageTitle = titleTag.innerHTML;
  console.log(
    `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
  );
} else {
  console.log("No title tag found in this document.");
}

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: "GREETINGS",
    payload: {
      message: "Hello, my name is Con. I am from ContentScript.",
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "EXTRACT") {
    // check if the page is the timetable page
    const iframe = document.getElementsByClassName("ps_target-iframe");
    if (iframe.length === 0) {
      alert("Please go to the timetable page first!");
      sendResponse({});
      return;
    }

    const main =
      iframe[0].contentDocument.getElementsByClassName("PSGROUPBOXWBO");
    if (main.length === 0) {
      alert("Please go to the timetable page first!");
      sendResponse({});
      return;
    }
    // check if the radio button is
    const listViewRadioButton = iframe[0].contentDocument.getElementById(
      "DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$"
    );
    if (listViewRadioButton.checked === false) {
      alert("Please select the list view first!");
      sendResponse({});
      return;
    }

    const data = [];

    for (let i = 1; i < main.length; i++) {
      const element = main[i];
      const courseName =
        element.getElementsByClassName("PAGROUPDIVIDER")[0].innerText;

      const timetable = element.querySelectorAll(
        "tbody > tr > td > table > tbody"
      )[2];

      const rows = timetable.querySelectorAll("tr");

      let lastClassNbr = "";
      let lastSection = "";
      let lastComponent = "";
      const campusAddress = {
        NYP: "\n172A Ang Mo Kio Avenue 8, Singapore 567739",
        DV: "\n10 Dover Drive, Singapore 138683",
        NP: "\n537 Clementi Road, Singapore 599493",
        RP: "\n43 Woodlands Avenue 9, Singapore 737729",
        SP: "\n510 Dover Road, Singapore 139660",
        TP: "\nBlk 29B Tampines Avenue 1, Singapore 528694",
      };
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");
        const classNbr = cells[0].innerText.trim();
        const section = cells[1].innerText.trim();
        const component = cells[2].innerText.trim();
        let daysNTimes = cells[3].innerText.trim();
        if (!daysNTimes.includes("-")) {
          continue;
        }
        daysNTimes = daysNTimes.slice(3).split(" - ");
        const room = cells[4].innerText.trim();
        const instructor = cells[5].innerText.trim();
        const date = cells[6].innerText.trim().split(" - ")[0];

        if (classNbr !== "" && classNbr !== lastClassNbr) {
          lastClassNbr = classNbr;
        }
        if (section !== "" && section !== lastSection) {
          lastSection = section;
        }
        if (component !== "" && component !== lastComponent) {
          lastComponent = component;
        }
        let location = room;
        if (room.split("-")[0] in campusAddress) {
          location = room + campusAddress[room.split("-")[0]];
        }

        const start = normalizeTime(daysNTimes[0], date);
        const end = normalizeTime(daysNTimes[1], date);

        data.push({
          courseName: courseName,
          classNbr: lastClassNbr,
          section: lastSection,
          component: lastComponent,
          startTime: start,
          endTime: end,
          location: location,
          instructor: instructor,
        });
      }
    }

    const ics = generateICS(data);

    downloadICS(ics);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

function normalizeTime(time, date) {
  const dateAndTime = require("date-and-time");

  if (time.length !== 5) {
    if (time.length === 6) {
      time = "0" + time;
    }
    time = time.slice(0, -2) + " " + time.slice(-2);
    time = dateAndTime.transform(time, "hh:mm A", "HH:mm");
  }

  return dateAndTime.parse(date + " " + time + " +0800", "DD/MM/YYYY HH:mm Z");
}

function generateICS(data) {
  const ics = require("ics");
  const dateAndTime = require("date-and-time");

  const processedData = data.map((item) => {
    return {
      title: `${item.courseName} (${item.section} ${item.component})`,
      start: [
        Number(dateAndTime.format(item.startTime, "YYYY", true)),
        Number(dateAndTime.format(item.startTime, "MM", true)),
        Number(dateAndTime.format(item.startTime, "DD", true)),
        Number(dateAndTime.format(item.startTime, "H", true)),
        Number(dateAndTime.format(item.startTime, "m", true)),
      ],
      startInputType: "utc",
      end: [
        Number(dateAndTime.format(item.endTime, "YYYY", true)),
        Number(dateAndTime.format(item.endTime, "MM", true)),
        Number(dateAndTime.format(item.endTime, "DD", true)),
        Number(dateAndTime.format(item.endTime, "H", true)),
        Number(dateAndTime.format(item.endTime, "m", true)),
      ],
      endInputType: "utc",
      location: item.location,
      description: `Class Nbr: ${item.classNbr}\nInstructor(s): ${item.instructor}`,
    };
  });
  const { error, value } = ics.createEvents(processedData);

  if (error) {
    console.log(error);
    return;
  }

  return value;
}

function downloadICS(ics) {
  var FileSaver = require("file-saver");
  var blob = new Blob([ics], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "myFile.ics");
}
