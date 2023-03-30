// src/server.ts
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import dotenv from 'dotenv';

// Laden Sie die Umgebungsvariablen aus der .env-Datei
dotenv.config();

const app = express();
app.use(express.json());

interface Project {
  id: string;
  name: string;
  client: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface TimeEntry {
  id: string;
  employeeId: string;
  projectId: string;
  task: string;
  minutes: number;
  /*to-do 2: enable sending date */
  date?:string
}

const dataFile = "./data.json";

const loadData = (): { projects: Project[]; employees: Employee[]; timeEntries: TimeEntry[] } => {
  try {
    const dataBuffer = fs.readFileSync(dataFile);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return {
      projects: [],
      employees: [],
      timeEntries: [],
    };
  }
};

const saveData = (data: { projects: Project[]; employees: Employee[]; timeEntries: TimeEntry[] }): void => {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync(dataFile, dataJson);
};

app.post("/projects", (req: Request, res: Response) => {
  const { name, client } = req.body;
  const newProject: Project = { id: uuidv4(), name, client };
  
  const data = loadData();
  /*to-do 1: loop through all projects, check if for given project name 
  and client an entry exists   */
  let duplicateTracker = false;
  data.projects.forEach(element => {
    if (element.name === name && element.client===client){
      duplicateTracker = true;
      return
    };  
  })
  /*if duplication test fails save data to file, else send failure status/message */
  if (duplicateTracker==false) {
    data.projects.push(newProject);
    saveData(data)
    res.status(201).json(newProject)}
  else{
    res.status(400).send("bad request, projectname for given client already exists")
  }

  /* 
  bug source: command overwrite object array with an array with a single entry of the
  newProject object 
  data.projects = [newProject];
  */
});

app.post("/employees", (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const newEmployee: Employee = { id: uuidv4(), firstName, lastName, email };
  const data = loadData();
  data.employees.push(newEmployee);
  saveData(data);
  res.status(201).json(newEmployee);
});

app.post("/timeEntries", (req: Request, res: Response) => {
  const { employeeId, projectId, task, minutes, date } = req.body;
  const newTimeEntry: TimeEntry = {
    id: uuidv4(),
    employeeId,
    projectId,
    task,
    minutes,
    date,
  };
  /*to-do 3: check for invalid timeinput(minutes). limit ist 8*60minutes */
  if(newTimeEntry.minutes <= 480){
    const data = loadData();
    data.timeEntries.push(newTimeEntry);
    saveData(data);
    res.status(201).json(newTimeEntry);
  }
  else{
    res.status(400).send("illegal time entry: maximum time per day is 8 hours(480minutes)")
  }
  
});


/* default response*/
app.get("/", (req:Request,res:Response)=>{
  res.send("up and running");
});

/*to-do 5: get-request for all employees.*/
app.get("/employees", (req:Request,res:Response)=>{
  const data = loadData();
  res.status(200).json(data.employees);
});

/*to-do 4: get-request for all projects.*/
app.get("/projects", (req:Request,res:Response)=>{
  const data = loadData();
  res.status(200).json(data.projects);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});

/*to-do 6: responds with time-entries for a given employeeId */
app.get("/timeEntries/:employeeId", (req:Request, res:Response)=>{
  const data = loadData();
  let filteredData=data.timeEntries.filter((entries)=>entries.employeeId == req.params.employeeId)
  res.status(200).json(filteredData)
})
