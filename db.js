const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://deepakkhatri16d:86b17ZyCjHgpwvMR@cluster0.gefq3qe.mongodb.net/employees")

const employeeSchema = mongoose.Schema({
    name:String,
    age:String,
    address:String,
    phoneno:String,
})

const employee = mongoose.model('employees', employeeSchema);

module.exports = {
    employee
}