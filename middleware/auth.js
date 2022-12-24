import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, 'thisismytoken')
            console.log('decoded',decoded)
            const prisma = new PrismaClient()
            const user = await prisma.employee.findUnique({
                where: {
                    id: decoded.userId
                },
                include: {
                    department: true
                }
            })
            console.log('user:', user)
            if(!user) {
                throw new Error()
            } 
            req.user = user
            req.token = token
            console.log('auth successful')
            next()
        } catch(e) {
            res.status(401).send(e.message)
        }
}

export { auth as default }
