import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import dnt from 'date-and-time';
import day_of_week from 'date-and-time/plugin/day-of-week';
import * as ics from 'ics'
import FileSaver from 'file-saver';

dnt.plugin(day_of_week);

type ClassInfo = {
  courseName: string,
  classNbr: string,
  section: string,
  component: string,
  startTime: Date,
  endTime: Date,
  location: string,
  instructor: string
}

const campusAddress: { [key: string]: string } = {
  NYP: "\n172A Ang Mo Kio Avenue 8, Singapore 567739",
  DV: "\n10 Dover Drive, Singapore 138683",
  NP: "\n537 Clementi Road, Singapore 599493",
  RP: "\n43 Woodlands Avenue 9, Singapore 737729",
  SP: "\n510 Dover Road, Singapore 139660",
  TP: "\nBlk 29B Tampines Avenue 1, Singapore 528694",
  E: "\n1 Punggol Coast Rd, Singapore 828608",
  W: "\n13 New Punggol Rd, Singapore 829979",
};

function normalizeTime(time: string, date: string) {
  if (time.length !== 5) {
    time = time.length === 6 ? "0" + time : time;
    time = time.slice(0, -2) + " " + time.slice(-2);
    time = dnt.transform(time, "hh:mm A", "HH:mm");
  }
  return dnt.parse(date + " " + time + " +0800", "DD/MM/YYYY HH:mm Z");
}

function generateModuleICS(classInfoArray: ClassInfo[]) {
  const processedData: ics.EventAttributes[] = classInfoArray.map((item) => ({
    title: `${item.courseName} (${item.section} ${item.component})`,
    start: [item.startTime.getFullYear(), item.startTime.getMonth() + 1, item.startTime.getDate(),
    item.startTime.getHours(), item.startTime.getMinutes()],
    startInputType: "utc",
    end: [item.endTime.getFullYear(), item.endTime.getMonth() + 1, item.endTime.getDate(),
    item.endTime.getHours(), item.endTime.getMinutes()],
    endInputType: "utc",
    location: item.location,
    description: `Class Nbr: ${item.classNbr}\nInstructor(s): ${item.instructor}`,
  }));

  const { error, value } = ics.createEvents(processedData);
  if (error) {
    console.log(error);
    return;
  }
  return value;
}

function parseModuleTimetable(moduleElements: HTMLCollectionOf<Element>) {
  const data = [];

  for (let i = 1; i < moduleElements.length; i++) {
    const element = moduleElements[i];
    const courseName = element.getElementsByClassName("PAGROUPDIVIDER")[0].innerHTML;
    const timetable = element.querySelectorAll("tbody > tr > td > table > tbody")[2];
    const rows = timetable.querySelectorAll("tr");

    let lastClassNbr = "", lastSection = "", lastComponent = "";

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const [classNbr, section, component, daysNTimesOriginal, room, instructor, date] =
        Array.from(cells).map(cell => cell.innerText.trim());

      if (!daysNTimesOriginal.includes("-")) continue;

      const daysNTimes = daysNTimesOriginal.slice(3).split(" - ");
      lastClassNbr = classNbr || lastClassNbr;
      lastSection = section || lastSection;
      lastComponent = component || lastComponent;

      let location = room;
      const campusCode = room.split("-")[0] || room[0];
      if (campusCode in campusAddress) {
        location += campusAddress[campusCode];
      }

      const start = normalizeTime(daysNTimes[0], date.split(" - ")[0]);
      const end = normalizeTime(daysNTimes[1], date.split(" - ")[0]);

      data.push({
        courseName, classNbr: lastClassNbr, section: lastSection, component: lastComponent,
        startTime: start, endTime: end, location, instructor
      });
    }
  }

  const icsData = generateModuleICS(data);
  if (icsData) {
    FileSaver.saveAs(new Blob([icsData], { type: "text/plain;charset=utf-8" }), "myFile.ics");
  } else {
    console.log("Error generating ICS");
  }
}

function parseExamTimetable(examElements: HTMLCollectionOf<Element>) {
  console.log("Exam timetable");
  const data = [];
  for (let i = 0; i < examElements.length; i++) {
    const element = examElements[i].children[0].textContent;
    if (!element) return;
    const parsedElement = element
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
    console.log(parsedElement);

    let venue = parsedElement[3].split(":")[1].trim();
    const campusCode = venue.split("-")[0] || venue[0];
    if (campusCode in campusAddress) {
      venue += campusAddress[campusCode];
    }

    const seatingInformation = {
      courseName: parsedElement[2].split(" ").slice(0, 2).join(" ") + " - " + parsedElement[2].split(" ").slice(2).join(" ") + " (Exam)",
      startTime: dnt.parse(parsedElement[0] + " " + parsedElement[1].split(" to ")[0], "dddd MMM D,YYYY h.mm A"),
      endTime: dnt.parse(parsedElement[0] + " " + parsedElement[1].split(" to ")[1], "dddd MMM D,YYYY h.mm A"),
      location: venue,
      seatNumber: parsedElement[4].split(":")[1].trim(),
    };
    console.log(seatingInformation);
    data.push(seatingInformation);
  }
  console.log(data);

  const icsData = generateExamICS(data);
  if (icsData) {
    FileSaver.saveAs(new Blob([icsData], { type: "text/plain;charset=utf-8" }), "myFile.ics");
  } else {
    console.log("Error generating ICS");
  }
}

function generateExamICS(examInfoArray: any[]) {
  const processedData: ics.EventAttributes[] = examInfoArray.map((item) => ({
    title: item.courseName,
    start: [item.startTime.getFullYear(), item.startTime.getMonth() + 1, item.startTime.getDate(),
    item.startTime.getHours(), item.startTime.getMinutes()],
    startInputType: "utc",
    end: [item.endTime.getFullYear(), item.endTime.getMonth() + 1, item.endTime.getDate(),
    item.endTime.getHours(), item.endTime.getMinutes()],
    endInputType: "utc",
    location: item.location,
    description: `Seat Number: ${item.seatNumber}`,
  }));

  const { error, value } = ics.createEvents(processedData);
  if (error) {
    console.log(error);
    return;
  }
  return value;
}

export default function ContentApp() {
  const [showExtractButton, setShowExtractButton] = useState(false);
  const [timeTableElements, setTimeTableElements] = useState<HTMLCollectionOf<Element>>();
  const [examElements, setExamElements] = useState<HTMLCollectionOf<Element>>();
  const [timeTableType, setTimeTableType] = useState("");

  function handleExtractButton() {
    if (timeTableType === "Module") {
      if (timeTableElements) {
        parseModuleTimetable(timeTableElements);
      }
    }
    else if (timeTableType === "Exam") {
      if (examElements) {
        parseExamTimetable(examElements);
      }
    }
  }

  useEffect(() => {
    const targetNode = document.head.getElementsByTagName('title')[0];
    const observer = new MutationObserver(() => {
      console.log(targetNode.textContent);
      if (targetNode.textContent === "My Class Schedule") {
        const iframe = document.getElementsByClassName("ps_target-iframe")[0] as HTMLIFrameElement;
        if (!iframe) return;

        const listViewRadioButton = iframe.contentDocument?.getElementById("DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$") as HTMLInputElement;
        if (listViewRadioButton?.checked) {
          console.log("List view is checked");
          setShowExtractButton(true);
          setTimeTableType("Module");
          const timeTableElements = iframe.contentDocument?.getElementsByClassName("PSGROUPBOXWBO");
          if (timeTableElements) setTimeTableElements(timeTableElements);
        }
      }
      else if (targetNode.textContent === "View My Exam Timetable") {
        const mainContent = document.getElementsByClassName("ps_pspagecontainer")[0];
        const examElements = mainContent?.children[0].getElementsByClassName("ps_box-scrollarea");
        if (examElements) {
          setShowExtractButton(true);
          setTimeTableType("Exam");
          if (examElements) setExamElements(examElements);
        }
      }
      else {
        setShowExtractButton(false);
      }
    });

    observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='m-4'>
        {showExtractButton && (
          <Button variant="contained" onClick={handleExtractButton} className="custom-pulse hover:animate-none">
            Extract {timeTableType} Timetable
          </Button>
        )}
      </div>
    </>
  )
}