import inquirer from "inquirer";
import { connectToDb } from "./connections.js";

const client = await connectToDb()



const questions = [
    {
        name: "view all employees",
        value: "questions1"
    },
    {
        name: "view all departments",
        value: "questions2"
    },
    {
        name: "view all roles",
        value: "questions3"
    },
    {
        name: "add department",
        value: "questions4"
    },
    {
        name: "add role",
        value: "questions5"
    },
    {
        name: "update employee",
        value: "questions6"
    },
    {
        name: "exit",
        value: "question7"
    }
]

async function viewAllEmployees (){
    //this should select all employees from the employee table and return it back
    const result = await client.query("SELECT * FROM employee")
    console.table(result.rows)
    mainQuestions()}
async function viewAllDepartments (){
    //this should select all departments from the department table and return it back
    const departments = await client.query("SELECT * FROM departments")
    console.table(departments.rows)
    mainQuestions()}
async function viewAllRoles (){
    //this should select all roles from the roles table and return it back
    const roles = await client.query("SELECT * FROM role")
    console.table(roles.rows)
    mainQuestions()}
async function addDepartment (){
    //what is the department, ask this in inquirer, select to departments
    const {name} = await inquirer.prompt([{
        type: "input",
        name: "name",
        message: "new department"
    }])
    await client.query("INSERT INTO departments (name) VALUES ($1)", [name])
    mainQuestions()}
async function addRole (){
    //what is the roles, ask this in inquirer, select to roles
    const {title, salary, department_id} = await inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What is role title?"
    }, {
        type: "input",
        name: "salary",
        message: "What is role salary?"
    }, {
        type: "input",
        name: "department_id",
        message: "What is role department_id?"
    }])
    await client.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id])
    mainQuestions()}
async function updateEmployee (){
    //what is the employee, ask this in inquirer, select to employees

    const {role_id, id} = await inquirer.prompt([{
        type: "input",
        name: "role_id",
        message: "What is new role?"
    }, {
        type: "input",
        name: "id",
        message: "What is new id?"
    }])
    await client.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, id])
    mainQuestions()}

async function mainQuestions(){
    const {input} = await inquirer.prompt([{
        type: "list",
        name: "input",
        message: "employee selection",
        choices: questions
    }]);
    if (input === "questions1"){
        viewAllEmployees()
    }
    if (input === "questions2"){
        viewAllDepartments()
    }
    if (input === "questions3"){
        viewAllRoles()
    }
    if (input === "questions4"){
        addDepartment()
    }
    if (input === "questions5"){
        addRole()
    }
    if (input === "questions6"){
        updateEmployee()
    }
    if (input === "question7"){
        process.exit()
    }
}

mainQuestions()