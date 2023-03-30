"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
// Laden Sie die Umgebungsvariablen aus der .env-Datei
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dataFile = "./data.json";
const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync(dataFile);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }
    catch (error) {
        return {
            projects: [],
            employees: [],
            timeEntries: [],
        };
    }
};
const saveData = (data) => {
    const dataJson = JSON.stringify(data);
    fs.writeFileSync(dataFile, dataJson);
};
app.post("/projects", (req, res) => {
    const { name, client } = req.body;
    const newProject = { id: (0, uuid_1.v4)(), name, client };
    const data = loadData();
    data.projects = [newProject];
    saveData(data);
    res.status(201).json(newProject);
});
app.post("/employees", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const newEmployee = { id: (0, uuid_1.v4)(), firstName, lastName, email };
    const data = loadData();
    data.employees.push(newEmployee);
    saveData(data);
    res.status(201).json(newEmployee);
});
app.post("/timeEntries", (req, res) => {
    const { employeeId, projectId, task, minutes } = req.body;
    const newTimeEntry = {
        id: (0, uuid_1.v4)(),
        employeeId,
        projectId,
        task,
        minutes,
    };
    const data = loadData();
    data.timeEntries.push(newTimeEntry);
    saveData(data);
    res.status(201).json(newTimeEntry);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
});
