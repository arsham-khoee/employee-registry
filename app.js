import bodyParser from 'body-parser'
import express, { request } from 'express'
import prisma from './prisma'
import { AppRoutes } from './routes'
import auth from './middleware/auth'

const app = express()
app.use(bodyParser.json())

async function main() {
    await prisma.$connect()
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
  
console.log(`Prisma ${prisma._clientVersion} is connected.`)

AppRoutes.forEach(route => {
    const controller = (request, response, next) => {
        route.action(request, response)
            .then(() => next)
            .catch(err => next(err))
    }
    let args = [route.path, auth, controller]
    if(!route.auth) {
        args.splice(1, 1)
    }
    app[route.method](...args)
})

app.listen(3000, () => console.log('Server is running on port 3000'))
