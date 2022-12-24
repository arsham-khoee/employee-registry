
import config from './config.js'
import { prisma } from './prisma'
import { app } from './app'
import { AppRoutes } from './routes'
import { auth } from './middleware/auth'

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
  
console.log(`PRISMA ${prisma._clientVersion}`)

// AppRoutes.forEach(route => {
//     const controller = (request, response, next) => {
//         route.action(request, response)
//             .then(() => next)
//             .catch(err => next(err))
//     }
//     let args = [route.path, auth, controller]
//     if(!route.auth) {
//         args.splice(1, 1)
//     }
//     app[route.method](...args)
// })

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON: http://${config.HOST}:${config.PORT}`);
})