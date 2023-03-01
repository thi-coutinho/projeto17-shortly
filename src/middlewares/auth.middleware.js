import db from '../config/db.js'

export async function authValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')
  if (!token) return res.status(401).send("Token is missing!")

  try {
    const { rowCount, rows: [userId, ..._] } = await db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [token])
    if (!rowCount) return res.status(401).send("Authorization required")
    res.locals.session = userId

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}

export async function urlOwnerValidation(req, res, next) {
  const { userId } = res.locals.session
  const { id } = req.params

  try {
    const { rowCount, rows: [ownerId, ..._] } = await db.query(`SELECT "userId" FROM urls WHERE id = $1;`, [id])
    if (!rowCount) return res.status(404).send("Url doesn't exists")
    if (ownerId.userId !== userId) return res.status(401).send("URL not owned by user")

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}