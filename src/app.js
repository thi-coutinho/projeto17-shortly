import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routers/auth.router.js'
import shortenRouter from './routers/shorten.router.js'

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

server.use([authRouter,shortenRouter])

const PORT = process.env.PORT 
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))