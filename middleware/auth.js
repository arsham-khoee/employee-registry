
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken'
import { User } from '../entity/User'
const auth = async (req, res, next) => {
    const userRepository = getManager().getRepository(User)
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        //console.log(token)
        const decoded = jwt.verify(token, 'thisismytoken')
        console.log(decoded)
        const user = await userRepository.findOneBy({ id: decoded._id })
        console.log(user)
        if(!user) {
            throw new Error()
        } 
        req.user = user
        req.token = token
        console.log('Authenticate successful')
        next()
    } catch(e) {
        res.status(401).send('Authenticate failed')
    }
}

module.exports = auth