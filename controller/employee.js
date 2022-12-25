import { PrismaClient } from '@prisma/client'
import generateToken from '../utils/generateToken'
import validateEmail from '../utils/validateEmail'
import validatePassword from '../utils/validatePassword'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function signupAction(req, res) {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['email', 'password']
        const isValidOperation = allowedUpdates.every((update) => updates.includes(update))
        if(!isValidOperation){
            return res.status(400).json({ message: 'email and password are required' })
        }
        if(!validateEmail(req.body.email)) {
            return res.status(400).json({ message: 'invalid email' })
        }
        if(!validatePassword(req.body.password)) {
            return res.status(400).json({ message: 'invalid password' })
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await prisma.employee.findUnique({
            where: {
                email: req.body.email
            }
        })
        if(user) {
            const updatedUser = await prisma.employee.update({
                where:{
                    id: user.id
                },
                data: {
                    password
                }
            })
            const token = await generateToken(user.id)
            return res.status(200).send({updatedUser, token})
        } else {
            res.status(400).json({ message: 'registering is not allowed' })
        }
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function loginAction(req, res) {
    try{
        const user = await prisma.employee.findUnique({
            where: {
                email: req.body.email
            }
        })
        const isMatch = await bcrypt.compare(args.data.password, user.password);
        if(!user || !isMatch) {
            res.status(400).json({ message: 'invalid email or password' })
        }
        const token = await generateToken(user.id)
        res.status(200).json({ user, token })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeesGetAllAction(req, res) {
    try{
        const employees = await prisma.employee.findMany({})
        if(employees.length == 0){
           return res.status(404).json({ message: 'no employee found' })
        }
        res.status(200).json(employees)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeePostAction(req, res) {
    try {
        if(req.user.role !== "ADMIN"){
            return res.status(403).json({ message: 'no permission' })
        }
        const user = await prisma.employee.create({
            data: req.body
        })
        res.status(201).json(user)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeeGetByIdAction(req, res) {
    try{
        const employee = await prisma.employee.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!employee) {
           return res.status(404).json({ message: 'no employee found' })
        }
        res.status(200).json(employee)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeeGetChangesHistoryAction(req, res) {
    try {
        // TODO: check if it is needed to check permissions
        // if(req.user.id !== req.params.id) {
        //     return res.status(403).json({ message: 'no permission' })
        // }
        const assignee = await prisma.employee.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!assignee) {
           return res.status(404).json({ message: 'no such assignee found' })
        }
        const changesHistory = await prisma.changesHistory.findMany({
            where: {
                assigneeId: req.params.id
            }
        })
        res.status(200).json(changesHistory)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeeUpdateAction(req, res) {
    try {
        if(req.user.id !== req.params.id && req.user.role !== "ADMIN"){
            return res.status(403).json({ message: 'no permission' })
        }
        const employee = await prisma.employee.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!employee) {
            return res.status(404).json({ message: 'no such employee found' })
        }
        const updates = Object.keys(req.body)
        let isValidOperation
        if(req.user.id === req.params.id) {
            const allowedUpdates = ['email', 'password', 'firstName', 'lastName', 'address']
            isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        }
        if(req.user.role === "ADMIN") {
            const allowedUpdates = ['email', 'password', 'firstName', 'lastName', 'address', 'jobTitle', 'departmentId', 'role']
            isValidOperation = updates.every((update) => allowedUpdates.includes(update))
            if(updates.includes('departmentId')) {
                console.log(req.user)
                // decrease the previous department employeeCount
                if(req.user.departmentId !== null) {
                    const previousDepartment = await prisma.department.findUnique({
                        where: {
                            id: req.user.departmentId
                        }
                    })
                    console.log(previousDepartment)
                    const updatedPreviousDepartment = await prisma.department.update({
                        where: {
                            id: req.user.departmentId
                        },
                        data: {
                            employeeCount: previousDepartment.employeeCount - 1
                        }
                    })
                }
                // increase the current department employeeCount
                if(req.body.departmentId !== "null") {
                    const currentDepartment = await prisma.department.findUnique({
                        where: {
                            id: req.body.departmentId
                        }
                    })
                    console.log(currentDepartment)
                    const updatedCurrentDepartment = await prisma.department.update({
                        where: {
                            id: req.body.departmentId
                        },
                        data: {
                            employeeCount: currentDepartment.employeeCount + 1
                        }
                    })
                }
                if(req.body.departmentId === "null") {
                    req.body.departmentId = null
                }
                const changesHistory = await prisma.changesHistory.create({
                    data: {
                        assignorId: req.user.id,
                        assigneeId: req.params.id,
                        previousDepartmentId: req.user.departmentId,
                        currentDepartmentId: req.body.departmentId
                    }
                })
            }
        }
        if(!isValidOperation){
            return res.status(400).json({ message: 'invalid update request' })
        }
        const updatedUser = await prisma.employee.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200).json(updatedUser)

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export async function employeeDeleteAction(req, res) {
    try {
        if(req.user.role !== "ADMIN") {
            return res.status(403).json({ message: 'no permission' })
        }
        const employee = await prisma.employee.findUnique({
            where: {
                id: req.params.id
            }
        })  
        if(!employee) {
            return res.status(404).json({ message: 'no such employee found' })
        }
        const deletedEmployee = await prisma.employee.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletedEmployee)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}
