const forum = require("./Forum.js")

module.exports = async function(database, req) {
    let page = req.query.page || 0
    let offset = page * 25
    
    let res = await database.query(`
    SELECT thread.postid AS threadpostid, thread.postsubject AS threadpostsubject, thread.replies AS threadreplies, thread.authorid AS threadauthorid, thread.lastpost AS threadlastpost, 
            lastreply.postid AS lastreplyid, lastreply.authorid AS lastreplyauthorid, lastreply.postdate AS lastreplydate
    FROM posts thread, posts lastreply
    WHERE thread.thread = true AND thread.subforum = $1 AND thread.lastpost = lastreply.postid
    ORDER BY lastreply.postdate DESC
    OFFSET $2
    LIMIT 25;
    `, [req.query.ForumID, offset])

    /*
    for (post of res.rows) {
        let lastpost = await database.query(`
        
        `, [post.lastpost])
        post.lastpost = lastpost.rows[0]
    
    } */

    let group = forum.find(g => g.forums.some(f => f.id == req.query.ForumID))
    return {forum: group.forums.find(f => f.id == req.query.ForumID),
        group: group,
        posts: res.rows,
        page: parseInt(page)}
}