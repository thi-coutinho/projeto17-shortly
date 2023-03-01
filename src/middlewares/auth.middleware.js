import db from '../config/db.js'

export async function authValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')
  if (!token) return res.status(401).send("Token is missing!")

  try {
    const {rowCount:checkSession, rows: [{userId},..._]} = await db.query(`SELECT * FROM sessions WHERE token = $1;`,[token])
    if (!checkSession) return res.status(401).send("Authorization required")
    res.locals.session = {userId}

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}