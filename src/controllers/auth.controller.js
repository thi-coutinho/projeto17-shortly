import db from "../config/db.js"
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from "uuid"

export async function signUp(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    try {
        const {rowCount: foundEmail} = await db.query("SELECT email FROM users where email = $1;",[email])
        
        if (foundEmail) return res.status(409).send("Email already exists")

        const user = await db.query(`
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)`,
        [name, email, hashedPassword])

        res.status(201).send("Successfully registered user!")

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body
    try {
        const {rowCount: userFound, rows: [queryReturnData,..._]} = await db.query(`SELECT id, email, password FROM users where email = $1`, [email])
        if (!userFound) return res.status(401).send("Incorrect email and/or password")

        const passwordCheck = bcrypt.compareSync(password, queryReturnData.password)
        if (!passwordCheck) return res.status(401).send("Incorrect email and/or password")
        console.log(queryReturnData)
        const token = uuidV4()
        await db.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1,$2)
        `,[queryReturnData.id, token])
        res.send({token})

    } catch (error) {
        res.status(500).send(error.message)
    }
}