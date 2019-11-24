import requests, re, io
from bs4 import BeautifulSoup

users = {}


Userurl = "https://web.archive.org/web/20080824061749/http://www.roblox.com/User.aspx?ID=156"

def downloadP(file_url, id):
    i = requests.get(file_url)
    if i.status_code == 200:
        with io.open("places/" + str(id) + ".png", 'wb') as file:
            file.write(i.content)
    else:
        return False

def downloadU(file_url, id):
    i = requests.get(file_url)
    if i.status_code == 200:
        with io.open("users/" + str(id) + ".png", 'wb') as file:
            file.write(i.content)
    else:
        return False

def getID(text):
    regex = r".+?ID=(\d+)"
    subst = r"\g<1>"
    return int(re.sub(regex, subst, text, 0, re.MULTILINE | re.IGNORECASE))

def getUsers(html):
    regex = r"User\.aspx\?ID=(\d+)"
    result = re.findall(regex, html, re.IGNORECASE)
    for user in result:
        submitUser(user)

def submitUser(userid):
    if not userid in users:
        users[userid] = 0

def _int(n):
    return int(n.replace(",", ""))

def saveGame(url): #dont be afraid of this part just take it left to right
    game = {}
    html = requests.get(url)
    details = BeautifulSoup(html.content, features="lxml")
    getUsers(str(details.select("#Body")[0]))
    game["name"] = details.select("#Item > h2")[0].get_text()
    game["id"] = getID(url)
    game["description"] = details.select("#Description")[0].get_text()
    game["creator"] = getID(details.select("#Creator > a")[0].get("href"))
    game["updated"] = details.select("#LastUpdate")[0].get_text().replace("Updated: ", "")
    game["favorites"] = _int(details.select("#Favorited")[0].get_text().replace("Favorited: ", "").replace(" times", ""))
    game["visits"] = _int(details.select(".Visited")[0].get_text().replace("Visited: ", "").replace(" times", ""))
    game["access"] = details.select('.PlayGames > div > span[style="display:inline;"]')[0].get_text().replace("\xa0", "") == "Public" #\xa0 is nbsp
    game["copylocked"] = details.select('.PlayGames > div > img')[0].get("alt") == "CopyLocked"
    game["comments"] = []
    comments = details.select(".CommentsContainer > .Comments")[0].findChildren("div", recursive=False)
    for comment in comments:
        commentinfo = {}
        commentinfo["author"] = getID(comment.select(".Post > .Audit > a")[0].get("href"))
        #raw
        rawtime = comment.select(".Post > .Audit")[0].get_text()
        #remove duplicate spaces
        rawtime = ' '.join(rawtime.split())
        commentinfo["time"] = rawtime.replace("Posted ", "").split("ago ")[0] + "ago"
        commentinfo["content"] = comment.select(".Post > .Content")[0].get_text()
        game["comments"].append(commentinfo)
    game["servers"] = []
    servers = details.select("#ctl00_cphRoblox_TabbedInfo_GamesTab_RunningGamesUpdatePanel tr")
    for server in servers:
        peeps = []
        #raw
        servertext = server.select("td > p")[0].get_text()
        #remove duplicate spaces
        servertext = ' '.join(servertext.split())
        for robloxian in server.select("a"):
            peeps.append(getID(robloxian.get("href")))
        game["servers"].append({"label": servertext, "people": peeps})
        
    print(game)




def saveUser(url):
    user = {}
    data = requests.get(Userurl).content

    soup = BeautifulSoup(data, features="lxml")
    user["name"] = soup.select(".Title")[0].get_text()
    user["id"] = getID(Userurl)
    user["description"] = soup.select("#ctl00_cphRoblox_rbxUserPane_rbxPublicUser_lBlurb")[0].get_text()

    # badges > name, picture, alt
    user["badges"] = []

    for badge in soup.select(".Badge"):
        badgelabel = badge.select(".Badge > .BadgeLabel > a")[0]
        name = badgelabel.get_text()
        user["badges"].append(name)
        
    # games > name, access, visits, id
    # save thumbnail as well
    user["games"] = []

    queue = {}
    games = soup.select("#UserPlaces > div")[0].findChildren("div > Place", recursive=False)
    for game in games:
        saveGame(game.select(".Thumbnail > a").get("href"))
            

            #downloadP(game.select(".Thumbnail > a > img").get("src"), queue["id"])

    #favorites > name, id
    user["favorites"] = []
    print(user)

saveUser("https://web.archive.org/web/20080825043025/http://www.roblox.com/User.aspx?ID=693923")