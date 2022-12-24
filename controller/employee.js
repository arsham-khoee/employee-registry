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
            res.status(400).send('email and password are required')
            return
        }
        if(!validateEmail(req.body.email)) {
            res.status(400).send('invalid email')
            return 
        }
        if(!validatePassword(req.body.password)) {
            res.status(400).send('invalid password')
            return 
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
            res.status(400).send('registering is not allowed')
        }
    } catch(e) {
        res.status(500).send()
    }
}