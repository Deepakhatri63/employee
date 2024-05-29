const express = require("express");
const { createEmployee, updateEmployee } = require("./types");
const { employee } = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.post("/employee",async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createEmployee.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }    
    await employee.create({
        name: createPayload.name,
        age: createPayload.age,
        address: createPayload.address,
        phoneno: createPayload.phoneno,
        // completed: false
    })
    res.json({
        msg:"Employee added"
    })
})
app.get("/employees",async function(req, res){
    const employees = await employee.find({});

    res.json({
        employees
    })
})

app.delete('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/employee/:id", async function(req, res){
    const { id } = req.params;
    const updatePayload = req.body;

    try {
        const updatedEmployee = await employee.findByIdAndUpdate(id, updatePayload, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3000);