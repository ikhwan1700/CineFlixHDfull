import requests
from bs4 import BeautifulSoup
import json

def scrape_lk21():
    url = 'https://tv3.lk21official.cc/'
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    movies = []
    for item in soup.select('.grid-item')[:20]:
        title_tag = item.select_one('.title a')
        img_tag = item.select_one('img')
        year_tag = item.select_one('.year')

        if title_tag and img_tag:
            title = title_tag.text.strip()
            link = title_tag['href']
            thumbnail = img_tag['src']
            year = year_tag.text.strip() if year_tag else "Unknown"

            movies.append({
                "title": title,
                "link": link,
                "thumbnail": thumbnail,
                "year": year
            })

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(movies, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    scrape_lk21()
