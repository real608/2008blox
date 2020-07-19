const forum = require("./Forum.js")

module.exports = async function(database, req) {
    let page = req.query.page || 0
    let offset = page * 25

    let res = await database.query(`
    SELECT postsubject, postbody, authorid, postdate, subforum
    FROM posts
    WHERE parentthread = $1
    ORDER BY postdate ASC
    LIMIT 25
    OFFSET $2;
    `, [req.query.PostID, offset])

    return {forum: forum.find(g => g.forums.find(f => f.id == res.subforum)), posts: res.rows}
}