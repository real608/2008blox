const forum = require("./Forum.js")

module.exports = async function(database, req) {
    return {group: forum.find(g => g.id == req.query.ForumGroupID)}
}