import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function departmentPostAction(req, res) {
    try {
        if(req.user.role !== "ADMIN") {
            return res.status(403).json({ message: 'no permission' })
        }
        if(!req.body.name) {
            return res.status(400).json('the required field is not provided')
        }
        const department = await prisma.department.create({
            data: req.body
        })
        res.status(201).json(department)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function departmentsGetAllAction(req, res) {
    try {
        let obj = {}
        if(req.query.skip && req.query.take){
            obj = {
                skip: ~~req.query.skip, 
                take: ~~req.query.take
            }
        } 
        let searchObj = {}
        if(req.query.searchText) {
            searchObj = {
                OR: [
                    {
                        name: {
                            contains: req.query.searchText
                        }
                    }
                ]
            }
            obj['where'] = searchObj
        }
        const departments = await prisma.department.findMany({
            ...obj
        })
        if(departments.length == 0) {
           return res.status(404).json({ message: 'no department found' })
        }
        res.status(200).json(departments)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function departmentGetByIdAction(req, res) {
    try {
        const department = await prisma.department.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!department) {
            return res.status(404).json({ message: 'no department found' })
         }
        res.status(200).json(department)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function departmentUpdateAction(req, res) {
    try {
        if(req.user.role !== "ADMIN") {
            return res.status(403).json({ message: 'no permission' })
        }
        const department = await prisma.department.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!department) {
            return res.status(404).json({ message: 'no such department found' })
        }
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if(!isValidOperation) {
            return res.status(400).json({ message: 'invalid update request' })
        }
        const updatedDepartment = await prisma.department.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200).json(updatedDepartment)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export async function departmentDeleteAction(req, res) {
    try {
        if(req.user.role !== "ADMIN") {
            return res.status(403).json({ message: 'no permission' })
        }
        const department = await prisma.department.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!department) {
            return res.status(404).json({ message: 'no such department found' })
        }
        // remove departmentId from its employees
        const updatedUsers = await prisma.employee.updateMany({
            where: {
                departmentId: req.params.id
            },
            data: {
                departmentId: null
            }
        })
        const deletedDepartment = await prisma.department.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletedDepartment) 
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}
