'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT') {
    // check if the page is the timetable page
    const iframe = document.getElementsByClassName('ps_target-iframe');
    if (iframe.length === 0) {
      alert('Please go to the timetable page first!');
      sendResponse({});
      return;
    }

    const main = iframe[0].contentDocument.getElementsByClassName('PSGROUPBOXWBO');
    if (main.length === 0) {
      alert('Please go to the timetable page first!');
      sendResponse({});
      return;
    }
    // check if the radio button is 
    const listViewRadioButton = iframe[0].contentDocument.getElementById("DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$");
    if (listViewRadioButton.checked === false) {
      alert('Please select the list view first!');
      sendResponse({});
      return;
    }

    const data = [];
    // console.log(`Current count is ${request.payload.count}`);



    for (let i = 1; i < main.length; i++) {
      const element = main[i];
      const courseName = element.getElementsByClassName('PAGROUPDIVIDER')[0].innerText;

      const timetable = element.querySelectorAll("tbody > tr > td > table > tbody")[2];

      const rows = timetable.querySelectorAll("tr");

      let lastClassNbr = "";
      let lastSection = "";
      let lastComponent = "";
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");
        const classNbr = cells[0].innerText.trim();
        const section = cells[1].innerText.trim();
        const component = cells[2].innerText.trim();
        const daysNTimes = cells[3].innerText.trim().slice(3, 16).split(" - ");
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

        const startTime = daysNTimes[0];
        const endTime = daysNTimes[1];

        data.push({
          courseName: courseName,
          classNbr: lastClassNbr,
          section: lastSection,
          component: lastComponent,
          startTime: startTime,
          endTime: endTime,
          room: room,
          instructor: instructor,
          date: date
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


function generateICS(data) {
  const ics = require('../node_modules/ics/dist')

  const processedData = data.map((item) => {
    return {
      title: `${item.courseName} (${item.section} ${item.component})`,
      start: [Number(item.date.split("/")[2]), Number(item.date.split("/")[1]), Number(item.date.split("/")[0]), Number(item.startTime.split(":")[0]), Number(item.startTime.split(":")[1])],
      end: [Number(item.date.split("/")[2]), Number(item.date.split("/")[1]), Number(item.date.split("/")[0]), Number(item.endTime.split(":")[0]), Number(item.endTime.split(":")[1])],
      location: `${item.room}${item.room === 'Online' ? '' : '\n172A Ang Mo Kio Ave 8\n567739\nSingapore'}`,
      description: `Class Nbr: ${item.instructor}\nInstructor(s): ${item.instructor}`
    }
  });
  const { error, value } = ics.createEvents(processedData);

  if (error) {
    console.log(error)
    return
  }

  return value;
}

function downloadICS(ics) {
  // const element = document.createElement("a");
  // const file = new Blob([ics], {type: 'text/plain'});
  // element.href = URL.createObjectURL(file);
  // element.download = "myFile.ics";
  // document.body.appendChild(element); // Required for this to work in FireFox
  // element.click();

  // Create a Blob object from the ICS data
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });

  // Create a URL object from the Blob
  const url = URL.createObjectURL(blob);

  // Create a download link and click it to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'myFile.ics';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link and releasing the URL object
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}