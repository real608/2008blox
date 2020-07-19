const forum = require("./Forum.js")

module.exports = async function(database) {
    return {forum: forum}
}