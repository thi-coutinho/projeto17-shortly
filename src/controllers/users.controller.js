import db from "../config/db.js"

export async function getUserData(_, res) {
    const { userId } = res.locals.session
    try {
        const { rowCount, rows: [data, ..._] } = await db.query(`
        SELECT
        json_build_object(
            'id' , users.id,
            'name' , users.name,
            'visitCount', SUM(urls."visitCount"),
            'shortenedUrls', array_agg(
                                        json_build_object(
                                        'id',urls.id, 
                                        'shortUrl',	urls."shortUrl", 
                                        'url', urls.url,
                                        'visitCount',	urls."visitCount"
                                        ) order by urls.id ASC
									  )
            ) 
        FROM urls
        JOIN users
        ON users.id = urls."userId"
        WHERE users.id = $1
        group by  users.id;
        `, [userId])
        if (rowCount) res.send(data.json_build_object)
        else res.send({})

    } catch (error) {
        res.status(500).send(error)
    }
}


export async function getUsersRanking(_, res) {
    try {
        const { rowCount, rows: data } = await db.query(`
        SELECT 
	        users.id as "id",
	        users.name as "name",
	        COUNT(urls.*) as "linksCount",
	        COALESCE(SUM(urls."visitCount"),0) as "visitCount" 
	    FROM urls
	    RIGHT JOIN users
	    	ON users.id = urls."userId"
	    group by  users.id
	    order by "visitCount" DESC
	    limit 10;
        `)
        if (rowCount) res.send(data)
        else res.send({})

    } catch (error) {
        res.status(500).send(error)
    }
}