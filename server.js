// server.js
// load the things we need
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const device = require('express-device');
const path = require('path');
const fs = require('fs')

const { Client } = require('pg')
require('dotenv').config();
const client = new Client()

client.connect().then(() => {
    console.log("connected to database")
}).catch(err => {
    console.error(err)
})

var app = express();

var port = process.env.PORT || 8080

var badgealt = {"Administrator": "This badge identifies an account as belonging to a Roblox administrator. Only official Roblox administrators will possess this badge. If someone claims to be an admin, but does not have this badge, they are potentially trying to mislead you. If this happens, please report abuse and we will delete the imposter's account.",
            "Forum Moderator": "Users with this badge are forum moderators. They have special powers on the ROBLOX forum and are able to delete threads that violate the Community Guidelines. Users who are exemplary citizens on ROBLOX over a long period of time may be invited to be moderators. This badge is granted by invitation only.",
            "Image Moderator": "Users with this badge are image moderators. Image moderators have special powers on ROBLOX that allow them to approve or disapprove images that other users upload. Rejected images are immediately banished from the site. Users who are exemplary citizens on ROBLOX over a long period of time may be invited to be moderators. This badge is granted by invitation only.",
            "Homestead": "The homestead badge is earned by having your personal place visited 100 times. Players who achieve this have demonstrated their ability to build cool things that other Robloxians were interested enough in to check out. Get a jump-start on earning this reward by inviting people to come visit your place.",
            "Bricksmith": "The Bricksmith badge is earned by having a popular personal place. Once your place has been visited 1000 times, you will receive this award. Robloxians with Bricksmith badges are accomplished builders who were able to create a place that people wanted to explore a thousand times. They no doubt know a thing or two about putting bricks together.",
            "Friendship": "This badge is given to players who have embraced the Roblox community and have made at least 20 friends. People who have this badge are good people to know and can probably help you out if you are having trouble.",
            "Inviter": "Robloxia is a vast uncharted realm, as large as the imagination. Individuals who invite others to join in the effort of mapping this mysterious region are honored in Robloxian society. Citizens who successfully recruit three or more fellow explorers via the Share Roblox with a Friend mechanism are awarded with this badge.",
            "Combat Initiation": "This badge is given to any player who has proven his or her combat abilities by accumulating 10 victories in battle. Players who have this badge are not complete newbies and probably know how to handle their weapons.",
            "Warrior": "This badge is given to the warriors of Robloxia, who have time and time again overwhelmed their foes in battle. To earn this badge, you must rack up 100 knockouts. Anyone with this badge knows what to do in a fight!",
            "Bloxxer": "Anyone who has earned this badge is a very dangerous player indeed. Those Robloxians who excel at combat can one day hope to achieve this honor, the Bloxxer Badge. It is given to the warrior who has bloxxed at least 250 enemies and who has tasted victory more times than he or she has suffered defeat. Salute!"}

var badgeimage = {"Administrator": "/Badges/Administrator-75x75.png",
            "Forum Moderator": "/Badges/ForumModerator-75x75.png",
            "Image Moderator": "/Badges/ImageModerator-75x75.png",
            "Homestead": "/Badges/Homestead-70x75.jpg",
            "Bricksmith": "/Badges/Bricksmith-54x75.jpg",
            "Friendship": "/Badges/Friendship-75x75.jpg",
            "Inviter": "/Badges/Inviter-75x75.png",
            "Combat Initiation": "/Badges/CombatInitiation-75x75.jpg",
            "Warrior": "/Badges/Warrior-75x75.jpg",
            "Bloxxer": "/Badges/Bloxxer-75x75.jpg"}

var gametestinginfo = {
    "game": {
      "name": "bruh moment",
      "id": 56696,
      "description": "Ullamco consectetur sunt dolore do occaecat anim est et est irure enim ea sint labore. Pariatur in voluptate mollit pariatur aute minim labore dolore cupidatat incididunt. Quis cillum nostrud occaecat pariatur veniam non dolore. Ut dolor aliquip reprehenderit reprehenderit pariatur minim elit. Non dolor minim quis esse. Elit adipisicing dolore sunt dolor sunt laboris nulla ullamco nulla proident. Qui Lorem cillum eu veniam do elit fugiat occaecat aliquip commodo in velit.\r\n",
      "updated": "1 days ago",
      "favorites": 1,
      "visits": 10,
      "access": false,
      "copylocked": false,
      "picture": "https://3.bp.blogspot.com/-b3s9qnGcgbA/UYTEb-PR19I/AAAAAAAAKEU/Dz4XMhLiTP4/s1600/Blue-Flower3333.jpg",
      "creator": {
        "id": 56595,
        "name": "Mcdaniel",
        "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
      },
      "comments": [
        {
          "author": {
            "id": 44791,
            "name": "Burch",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 6 days ago",
          "content": "exercitation culpa ipsum quis cillum ad sunt mollit eu aliquip"
        },
        {
          "author": {
            "id": 34739,
            "name": "Walters",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 4 days ago",
          "content": "culpa proident ipsum reprehenderit quis fugiat velit cupidatat laboris excepteur"
        },
        {
          "author": {
            "id": 18074,
            "name": "Copeland",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 3 days ago",
          "content": "culpa laborum exercitation reprehenderit eu dolor excepteur duis quis quis"
        },
        {
          "author": {
            "id": 72238,
            "name": "Mays",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "et velit id incididunt ea deserunt do reprehenderit labore enim"
        },
        {
          "author": {
            "id": 93363,
            "name": "Avery",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 1 days ago",
          "content": "exercitation eu enim officia commodo fugiat amet aliquip aliquip qui"
        },
        {
          "author": {
            "id": 4220,
            "name": "Perry",
            "picture": "http://www.canadianflowerdelivery.com/assets/images/content/peony_195x195.jpg"
          },
          "time": "Posted 4 days ago",
          "content": "do fugiat esse amet deserunt exercitation magna nisi eiusmod nulla"
        }
      ]
    }
  }
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser())
app.use(device.capture());
app.use(bodyParser.urlencoded({ extended: false }))
// use res.render to load up an ejs view file

// index page 
app.get('*', function(req, res, next) {
  if (req.cookies.acceptednew == "true" || req.path == "/ohnoes" || req.path == "/discord" || req.device.type == "bot") {
    res.locals.partials = path.join(
      __dirname, "views/partials"
    )

    res.locals.currentDate = new Date('2008-07-25 10:04:00.000')

    res.locals.formatNum = function(n) {
        return n.toLocaleString()
    }

    res.locals.datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    function getTime(date) {
      let time = threadDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      if (time.length == 7) { // Pad
          time = "0" + time
      }
      return time
    }

    res.locals.formatDate = function(date) {
      threadDate = new Date(date)

      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(threadDate)
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(threadDate)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(threadDate)

      return da + " " + mo + " " + ye + " " + getTime(threadDate)
    }

    res.locals.formatRelativeDate = function(date) {
      threadDate = new Date(date)

      if (res.locals.datesAreOnSameDay(threadDate, res.locals.currentDate)) {
          return "<b>Today @ " + getTime(threadDate) + "</b>"
      }

      return res.locals.formatDate(date)
    }

    next();
  } else {
    res.render('meta/disclaimer.ejs');
  }
});

app.get('/', function(req, res) {
    res.render('meta/index.ejs', {'blankurl': req.cookies.blankurl});
});

app.post('/Accept.aspx', function(req, res) {
  if (req.body.yes) {
    res.cookie('acceptednew', true, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.cookie('blankurl', "/blank.png", { expires: new Date(Date.now() + 900000) });
    res.redirect('back')
  } else {
    res.redirect('/ohnoes')
  }
});

/*
app.get('/Parents.aspx', function(req, res) {
  res.render('parents.ejs', {'blankurl': req.cookies.blankurl});
})

app.get('/Parents/:page.aspx', function(req, res) {
  res.render('parents/' + req.params.page + '.ejs', {'blankurl': req.cookies.blankurl});
})
*/

app.get('/license', function(req, res) {
    res.redirect("https://github.com/2008blox/2008blox/blob/master/LICENSE"); //Gotta be professional, ya know?
});

app.get('/discord', function(req, res) {
  res.redirect("https://discord.gg/63wDvud");
});

app.get('/test', function(req, res) {

});

app.get('/ohnoes', function(req, res) {
   res.sendFile(path.join(__dirname, "./public/oof.png"));
});

app.get('*', async function(req, res){
  // Check if this is a path
  let JSPath = path.join(
    __dirname, path.join("server", req.path.replace(".aspx", ".js"))
  )

  let viewPath = path.join(
    __dirname, path.join("views", req.path.replace(".aspx", ".ejs"))
  )

  if (viewPath.endsWith(".ejs") && fs.existsSync(viewPath)) {
    let params = {}
    if (fs.existsSync(JSPath)) {
      let func = require(JSPath)
      params = await func(client, req)
    }
    return res.render(viewPath, params)
  }

  return res.status(404).render('meta/404.ejs');
});

app.listen(port);
console.log(port + ' is the magic port');