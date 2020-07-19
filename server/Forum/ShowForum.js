const forum = require("./Forum.js")

module.exports = async function(database, req) {
    let page = req.query.page || 0
    let offset = page * 25

    let res = await database.query(`
    SELECT postid, postsubject, replies, authorid
    FROM posts
    WHERE thread = true AND subforum = $1
    ORDER BY postdate DESC
    LIMIT 25
    OFFSET $2;
    `, [req.query.ForumID, offset])
    let group = forum.find(g => g.forums.some(f => f.id == req.query.ForumID))
    return {forum: group.forums.find(f => f.id == req.query.ForumID),
        group: group,
        posts: res.rows,
        page: page}
}