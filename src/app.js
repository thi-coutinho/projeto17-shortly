import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routers/auth.router.js'
import urlsRouter from './routers/urls.router.js'
import usersDataRouter from './routers/users.router.js'

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

server.use([authRouter,urlsRouter,usersDataRouter])

const PORT = process.env.PORT 
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))