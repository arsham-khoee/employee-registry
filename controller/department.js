import { PrismaClient } from '@prisma/client'

export async function departmentPostAction(req, res) {
    try {
        const prisma = new PrismaClient()
        if(req.user.role !== "ADMIN") {
            return res.status(403).json({ message: 'no permission' })
        }
        if(!req.body.name) {
            return res.status(400).json('the required field is not provided')
        }
        const department = await prisma.department.create({
            data: req.body
        })
        res.status(200).json(department)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function departmentsGetAllAction(req, res) {
    try {
        const prisma = new PrismaClient()
        const user = await prisma.department.findFirst({
            where: {
                id: req.user.id
            }
        })
        if(!user) {
            res.status(404).json({ message: 'no employee found' })
        }
        const departments = await prisma.department.findMany({})
        res.status(200).json(departments)
    } catch(e) {
        res.status(500).json(e.message)
    }
}