import { PrismaClient } from '@prisma/client'
import generateToken from '../utils/generateToken'
import validateEmail from '../utils/validateEmail'
import validatePassword from '../utils/validatePassword'

export async function SignupAction(req, res) {
    try {
        const prisma = new PrismaClient()

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

        const user = await prisma.employee.findFirst({
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
                    password: req.body.password
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

export async function LoginAction(req, res) {
    try{
        const prisma = new PrismaClient()
        const user = await prisma.employee.findUnique({
            where: {
                email: req.body.email
            }
        })
        if(!user || user.password !== req.body.password) {
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
        const prisma = new PrismaClient()
        const user = await prisma.employee.findFirst({
            where: {
                id: req.user.id
            }
        })
        if(!user) {
            res.status(400).json({ message: 'no employees found' })
        }
        const employees = await prisma.employee.findMany({})
        res.status(200).json(employees)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function employeePostAction(req, res) {
    try {
        if(req.user.role !== "ADMIN"){
            return res.status(401).json({ message: 'no permission' })
        }
        const prisma = new PrismaClient()
        const user = await prisma.employee.create({
            data: req.body
        })
        res.status(201).json(user)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}