// server.js
// load the things we need
var express = require('express');
var app = express();

badgealt = {"Administrator": "This badge identifies an account as belonging to a Roblox administrator. Only official Roblox administrators will possess this badge. If someone claims to be an admin, but does not have this badge, they are potentially trying to mislead you. If this happens, please report abuse and we will delete the imposter's account.",
            "Forum Moderator": "Users with this badge are forum moderators. They have special powers on the ROBLOX forum and are able to delete threads that violate the Community Guidelines. Users who are exemplary citizens on ROBLOX over a long period of time may be invited to be moderators. This badge is granted by invitation only.",
            "Image Moderator": "Users with this badge are image moderators. Image moderators have special powers on ROBLOX that allow them to approve or disapprove images that other users upload. Rejected images are immediately banished from the site. Users who are exemplary citizens on ROBLOX over a long period of time may be invited to be moderators. This badge is granted by invitation only.",
            "Homestead": "The homestead badge is earned by having your personal place visited 100 times. Players who achieve this have demonstrated their ability to build cool things that other Robloxians were interested enough in to check out. Get a jump-start on earning this reward by inviting people to come visit your place.",
            "Bricksmith": "The Bricksmith badge is earned by having a popular personal place. Once your place has been visited 1000 times, you will receive this award. Robloxians with Bricksmith badges are accomplished builders who were able to create a place that people wanted to explore a thousand times. They no doubt know a thing or two about putting bricks together.",
            "Friendship": "This badge is given to players who have embraced the Roblox community and have made at least 20 friends. People who have this badge are good people to know and can probably help you out if you are having trouble.",
            "Inviter": "Robloxia is a vast uncharted realm, as large as the imagination. Individuals who invite others to join in the effort of mapping this mysterious region are honored in Robloxian society. Citizens who successfully recruit three or more fellow explorers via the Share Roblox with a Friend mechanism are awarded with this badge.",
            "Combat Initiation": "This badge is given to any player who has proven his or her combat abilities by accumulating 10 victories in battle. Players who have this badge are not complete newbies and probably know how to handle their weapons.",
            "Warrior": "This badge is given to the warriors of Robloxia, who have time and time again overwhelmed their foes in battle. To earn this badge, you must rack up 100 knockouts. Anyone with this badge knows what to do in a fight!",
            "Bloxxer": "Anyone who has earned this badge is a very dangerous player indeed. Those Robloxians who excel at combat can one day hope to achieve this honor, the Bloxxer Badge. It is given to the warrior who has bloxxed at least 250 enemies and who has tasted victory more times than he or she has suffered defeat. Salute!"}

badgeimage = {"Administrator": "/Badges/Administrator-75x75.png",
            "Forum Moderator": "/Badges/ForumModerator-75x75.png",
            "Image Moderator": "/Badges/ImageModerator-75x75.png",
            "Homestead": "/Badges/Homestead-70x75.jpg",
            "Bricksmith": "/Badges/Bricksmith-54x75.jpg",
            "Friendship": "/Badges/Friendship-75x75.jpg",
            "Inviter": "/Badges/Inviter-75x75.png",
            "Combat Initiation": "/Badges/CombatInitiation-75x75.jpg",
            "Warrior": "/Badges/Warrior-75x75.jpg",
            "Bloxxer": "/Badges/Bloxxer-75x75.jpg"}

gametestinginfo = {
    "game": {
      "name": "bruh moment",
      "creator": {
        "name": "Warner",
        "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
      },
      "comments": [
        {
          "author": {
            "name": "Guerra",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 3 days ago",
          "content": "irure sint fugiat reprehenderit enim nulla voluptate eu aliqua sint"
        },
        {
          "author": {
            "name": "Hess",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 2 days ago",
          "content": "dolor proident cillum proident consectetur do exercitation labore voluptate ullamco"
        },
        {
          "author": {
            "name": "Barron",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "elit aliqua reprehenderit proident quis labore laborum amet esse esse"
        },
        {
          "author": {
            "name": "Leonard",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 4 days ago",
          "content": "exercitation reprehenderit ullamco id ipsum elit in cupidatat esse culpa"
        },
        {
          "author": {
            "name": "Wilson",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "labore incididunt ullamco minim dolore eu ex ex do ex"
        },
        {
          "author": {
            "name": "Byrd",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "labore consequat laborum fugiat excepteur irure cupidatat proident proident eu"
        },
        {
          "author": {
            "name": "Ashley",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "aute elit occaecat Lorem incididunt nulla commodo dolore amet consectetur"
        }
      ]
    }
  }
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'))
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/game', function(req, res) {
    res.render('..\\templates\\game.ejs', gametestinginfo)
});

app.get('/User.aspx', function(req, res) {

});

app.listen(1337);
console.log('1337 is the magic port');