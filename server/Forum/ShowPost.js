const forum = require("./Forum.js")

module.exports = async function(database, req) {
    let page = req.query.page || 0
    let offset = page * 25

    let pages = await database.query(`
    SELECT 
        COUNT(parentthread) 
    FROM 
        posts
    WHERE
        parentthread = $1;`, [req.query.PostID])

    pages = Math.floor(parseInt(pages.rows[0].count) / 25)

    console.log(pages)

    let res = await database.query(`
    SELECT postsubject, postbody, authorid, postdate, subforum
    FROM posts
    WHERE parentthread = $1
    ORDER BY postdate ASC
    OFFSET $2
    LIMIT 25;
    `, [req.query.PostID, offset])

    let ForumID = res.rows[0].subforum
    let group = forum.find(g => g.forums.some(f => f.id == ForumID))
    return {forum: group.forums.find(f => f.id == ForumID),
        group: group, 
        posts: res.rows, page: parseInt(page), pages: pages,
        postid: req.query.PostID
    }
}