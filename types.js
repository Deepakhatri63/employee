const zod = require("zod")

const createEmployee = zod.object({
    name: zod.string(),
    age: zod.string(),
    address: zod.string(),
    phoneno: zod.string(),
})

const updateEmployee = zod.object({
    id: zod.string(),
})

module.exports = {
    createEmployee: createEmployee,
    updateEmployee: updateEmployee
}