from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
from ics import Calendar, Event

def eventName(a, b ,c):
    return a + " (" + b + " " + c + ")"

def eventBegin(a, b):
    beginDateNTime = datetime.strptime(a[0:10] + b[2:7], "%d/%m/%Y %H:%M")
    return beginDateNTime.strftime("%Y-%m-%d %H:%M:%S")

def eventEnd(a, b):
    endDateNTime = datetime.strptime(a[0:10] + b[10:], "%d/%m/%Y %H:%M")
    return endDateNTime.strftime("%Y-%m-%d %H:%M:%S")

def eventDescription(a, b):
    return "Class Nbr: " + a + "\n" + "Instructor(s): " + b

def eventLocation(a):
    if a == "Online":
        return a
    return a + "\n172A Ang Mo Kio Ave 8\n567739\nSingapore"

def createEvent(nameStr, beginStr, endStr, descriptionStr, locationStr):
    e = Event()
    beginDateNTime = datetime.strptime(beginStr, "%Y-%m-%d %H:%M:%S")
    endDateNTime = datetime.strptime(endStr, "%Y-%m-%d %H:%M:%S")

    
    e.name = nameStr
    e.begin = datetime.fromisoformat(beginStr + "+08:00")
    e.end = datetime.fromisoformat(endStr + "+08:00")
    e.description = descriptionStr
    e.location = locationStr
    c.events.add(e)

soup = BeautifulSoup(open("My Class Schedule.html"), features="html.parser")

tables = soup.findAll(class_="PSGROUPBOXWBO")
pdData = []

for i in range(len(tables)):
    # Find course name of the table
    courseName = tables[i].find(class_="PAGROUPDIVIDER")
    if courseName == None:
        continue
    courseNameStr = " ".join(courseName.text.split())

    # Locate the timetable and get the data of all the rows
    timeTable = tables[i].findAll(class_="PSLEVEL3GRID")[1]
    timeTableRows = timeTable.findAll("tr")[1:]

    firstThreeColumnData = []
    for row in timeTableRows:
        rowText = []
        rowText.append(courseNameStr)
        tdata = row.findAll("td")
        for data in tdata:
            rowText.append(" ".join(data.text.split()))

        # Put first three column data into every row
        if rowText[1] != "":
            firstThreeHeaderData = rowText[1:4]
        else:
            rowText[1:4] = firstThreeHeaderData
        
        pdData.append(rowText)

df = pd.DataFrame(pdData, columns=["Course Name", "Class Nbr", "Section", "Component",
                  "Days & Times", "Room", "Instructor", "Start/End Date"])


df2 = pd.DataFrame()
df2["name"] = df.apply(lambda x: eventName(x["Course Name"], x["Section"], x["Component"]), axis = 1)
df2["begin"] = df.apply(lambda x: eventBegin(x["Start/End Date"], x["Days & Times"]), axis = 1)
df2["end"] = df.apply(lambda x: eventEnd(x["Start/End Date"], x["Days & Times"]), axis = 1)
df2["description"] = df.apply(lambda x: eventDescription(x["Class Nbr"], x["Instructor"]), axis = 1)
df2["location"] = df.apply(lambda x: eventLocation(x["Room"]), axis = 1)


c = Calendar()

df2.apply(lambda x: createEvent(x["name"], x["begin"], x["end"], x["description"], x["location"]), axis = 1)

with open('my.ics', 'w') as f:
    f.writelines(c.serialize_iter())