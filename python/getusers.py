import requests, re, io
import psycopg2
from bs4 import BeautifulSoup


users = {}
games = {}
items = {}

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
    print(text)
    regex = r".+?\?ID=(\d+).*?$"
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

def submitGame(gameid):
    if not gameid in games:
        games[gameid] = 0

def submitItem(itemid):
    if not itemid in items:
        items[itemid] = 0

def _int(n):
    return int(n.replace(",", ""))

def saveGame(url): #dont be afraid of this part just take it left to right
    game = {}
    html = requests.get(url)
    soup = BeautifulSoup(html.content, features="lxml")
    getUsers(str(soup.select("#Body")[0]))
    game["name"] = soup.select("#Item > h2")[0].get_text()
    game["id"] = getID(url)
    game["description"] = soup.select("#Description")[0].get_text()
    game["creator"] = getID(soup.select("#Creator > a")[0].get("href"))
    game["updated"] = soup.select("#LastUpdate")[0].get_text().replace("Updated: ", "")
    game["favorites"] = _int(soup.select("#Favorited")[0].get_text().replace("Favorited: ", "").replace(" times", ""))
    game["visits"] = _int(soup.select(".Visited")[0].get_text().replace("Visited: ", "").replace(" times", ""))
    game["access"] = soup.select('.PlayGames > div > span[style="display:inline;"]')[0].get_text().replace("\xa0", "") == "Public" #\xa0 is nbsp
    game["copylocked"] = soup.select('.PlayGames > div > img')[0].get("alt") == "CopyLocked"
    game["comments"] = []
    comments = soup.select(".CommentsContainer > .Comments")[0].findChildren("div", recursive=False)
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
    servers = soup.select("#ctl00_cphRoblox_TabbedInfo_GamesTab_RunningGamesUpdatePanel tr")
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

def saveItem(url):
    data = requests.get(url)

    soup = BeautifulSoup(data.content, features="lxml")
    getUsers(str(soup.select("#Body")[0]))
    item = {}
    item["name"] = soup.select("#Item > h2")[0].get_text()
    item["id"] = getID(url)
    item["creator"] = getID(soup.select("#ctl00_cphRoblox_CreatorHyperLink").get("href"))
    item["updated"] = soup.select("#LastUpdate")[0].get_text().replace("Updated: ", "")
    item["favorites"] = _int(soup.select("#Favorited")[0].get_text().replace("Favorited: ", "").replace(" times", ""))
    item["description"] = soup.select("#Description")[0].get_text()
    if soup.select("#PriceInRobux"):
        item["robux"] = soup.select("#PriceInRobux")[0].get_text().replace("R$: ", "")
    else:
        item["robux"] = 0
    if soup.select("#PriceInTickets"):
        item["tix"] = soup.select("#PriceInTickets")[0].get_text().replace("Tx: ", "")
    else:
        item["tix"] = 0
    



def saveUser(url):
    user = {}
    data = requests.get(url)

    soup = BeautifulSoup(data.content, features="lxml")
    getUsers(str(soup.select("#Body")[0]))
    user["name"] = soup.select(".Title")[0].get_text()
    user["id"] = getID(url)
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

    places = soup.select("#UserPlaces .Place")
    for place in places:
        gameid = getID(place.select(".Thumbnail > a")[0].get("href"))
        user["games"].append(gameid)
        submitGame(gameid)

    #favorites > name, id
    user["favorites"] = []
    favorites = soup.select("#Favorites table td")
    for favorite in favorites:
        gameid = getID(favorite.select("div a")[0].get("href"))
        user["favorites"].append(gameid)
        submitGame(gameid)

    user["inventory"] = []
    inventory = soup.select("#UserAssets table tr")
    for row in inventory:
        rowlist = []
        for item in row.select("td > div > .AssetThumbnail > a"):
            itemid = getID(item.get("href"))
            rowlist.append(itemid)
            submitItem(itemid)
        user["inventory"].append("rowlist")

    user["friends"] = {"count": 0, "frontpage": []}
    user["friends"]["frontpage"] = int(soup.select("#Friends > h4 > a")[0].get_text().replace("See all "))
    friends = soup.select("#Friends table td .Avatar a")
    for friend in friends:
        userid = getID(item.get("href"))
        user["friends"]["frontpage"].append(userid)

count = 0

#while True:
#    if count % 3 == 0:
#
#    elif count % 3 == 1:
#
#    elif count % 3 == 2:
    

    

saveUser("https://web.archive.org/web/20080825043025/http://www.roblox.com/User.aspx?ID=693923")
saveItem("https://web.archive.org/web/20080824140114/http://www.roblox.com/Item.aspx?ID=1081366")