import { nanoid } from "nanoid"
import db from "../config/db.js"

export default async function shortenUrl(req, res) {
    const { url } = req.body
    const { userId } = res.locals.session
    const shortUrl = nanoid(8)
    try {
        const { rowCount, rows: [{ id }, ..._] } = await db.query(`
        INSERT INTO urls
        (url, "shortUrl", "userId")
        VALUES ($1 , $2, $3)
        RETURNING id
        `, [url, shortUrl, userId])
        if (rowCount) return res.send({ id, shortUrl })
        else return res.status(500).send("erro ao inserir no banco de dados")
    } catch (error) {
        res.status(500).send(error)
    }

}