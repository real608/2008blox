import time, requests, os, json
from bs4 import BeautifulSoup

base = "https://web.archive.org/web/20080611062845/http://www.roblox.com/"
barebones = "https://web.archive.org/"

sitemap = {}
sitemap[base] = False

while True:
    for req, checked in sitemap.copy().items():
        if not checked:
            sitemap[req] = True
            print("Requesting " + str(req))
            try:
                html = requests.get(req).content
            except:
                print("Aw man can't request that")
                continue
            soup = BeautifulSoup(html, features="lxml")
            links = soup.find_all('a')
            if len(links) > 0:
                for link in soup.find_all('a'):
                    url = link.get('href')
                    if not url:
                        continue
                    if ("mailto" in url) or url.startswith("javascript") or url.startswith("feed:"):
                        continue
                    if not url.startswith("http"):
                        url = os.path.join(base, url)
                    if url.startswith("/web/"):
                        url = os.path.join(barebones, url[1:])
                    if (url in sitemap):
                        continue
                    sitemap[url] = False
                    print("Found " + str(url))
                json.dump(list(sitemap.keys()), open("sitemap.json", "w+"))
            print("Waiting 4.5 sec")
            time.sleep(4.5)
