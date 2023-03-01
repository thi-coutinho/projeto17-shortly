import { nanoid } from "nanoid"
import db from "../config/db.js"

export async function shortenUrl(req, res) {
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
        if (rowCount) return res.status(201).send({ id, shortUrl })
        else return res.status(500).send("erro ao inserir no banco de dados")
    } catch (error) {
        res.status(500).send(error)
    }

}

export async function getUrl(req, res) {
    const { id } = req.params

    try {
        const { rowCount, rows: [data, ..._] } = await db.query(`
        SELECT id, "shortUrl", url
        FROM urls
        WHERE id = $1
        `, [id])
        if (!rowCount) return res.sendStatus(404)
        else return res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }

}

export async function redirectShortUrl(req, res) {
    const { shortUrl } = req.params
    try {
        const { rowCount, rows: [data, ..._] } = await db.query(`
        UPDATE urls
        set "visitCount" = "visitCount" + 1
        WHERE "shortUrl" = $1
        RETURNING url;
        `, [shortUrl])
        if (!rowCount) return res.sendStatus(404)
        else return res.redirect(data.url)
    } catch (error) {
        res.status(500).send(error)
    }

}


export async function deleteUrl(req, res) {
    const { id } = req.params

    try {
        await db.query(`
        DELETE FROM urls
        WHERE id = $1;
        `, [id])
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error)
    }
}