import requests
import time
import os
from dotenv import load_dotenv
from PIL import Image
import io
from bs4 import BeautifulSoup
import openai
from keybert import KeyBERT

# Azure OpenAI API 설정-azure openai api키와 엔드포인트를 받아서 open ai 실행
api_base = os.getenv("AZURE_OAI_ENDPOINT")
api_key = os.getenv("AZURE_OAI_KEY")
api_version = '2023-06-01-preview'

# Generic web scraping function- 크롤링 하려는 웹페이지 탐색
def scrape_articles(url, headline_tag='h3'):
    try:
        # Send an HTTP GET request to the provided URL - 페이지 URL HTTP 요청 받기
        response = requests.get(url)

        # Check if the request was successful (status code 200) - HTTP 요청이 성공적인지 확인하기
        if response.status_code == 200:
            # Parse the HTML content of the page
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find all the headlines using the specified HTML tag - 뉴스 헤드라인 추출
            headlines = soup.find_all(headline_tag)

            # Extract the text from the headlines and their links - 뉴스 내용 밑 첨부 링크 추출
            articles = [{'headline': headline.get_text(), 'link': headline.a['href']} for headline in headlines]

            return articles
        else:
            print(f"Failed to retrieve articles. Status code: {response.status_code}")
            return []
    
    except Exception as ex:
        print(f"An error occurred during web scraping: {ex}")
        return []

# Azure OpenAI text summarization - azure openai 로 웹크롤링한 텍스트 요약
def summarize_text_with_azure_openai(text, max_tokens=50):
    try:
        # Make a call to the Azure OpenAI API for text summarization - azure api키 불러오기
        if api_base is not None:
            url = f"{api_base}/openai/text/summarize?api-version={api_version}"
            headers = {"api-key": api_key, "Content-Type": "application/json"}
            body = {
                "text": text,
                "max_tokens": max_tokens
            }
            response = requests.post(url, headers=headers, json=body)

            # Check if the request was successful
            if response.status_code == 200:
                # Get the summary from the API response - 요약 성공시 요약된 내용 도출
                summary = response.json().get("summary", "")
                return summary
            else:
                print("Failed to summarize text with Azure OpenAI API.")
                return None
        else:
            print("api_base is not defined.")
            return None

    except Exception as ex:
        print("An error occurred during text summarization:", ex)
        return None

# Keyword extraction using KeyBERT - Keybert로 azure openai 로 요약한 글에서 키워드 추출하기
def extract_keywords(text, top_n=5):
    model = KeyBERT("distilbert-base-nli-mean-tokens")
    keywords = model.extract_keywords(text, top_n=top_n)
    return keywords

# 이미지 생성 함수
def generate_image(prompt, api_base, api_key, api_version):
    try:
        # Make the initial call to start the job
        if api_base is not None:
            url = f"{api_base}/openai/images/generations:submit?api-version={api_version}"
            headers = {"api-key": api_key, "Content-Type": "application/json"}
            body = {
                "prompt": prompt,
                "n": 1,
                "size": "512x512"
            }
            submission = requests.post(url, headers=headers, json=body)

            # Get the operation-location URL for the callback
            operation_location = submission.headers.get('Operation-Location', '')

            if not operation_location:
                print("Failed to start image generation job.")
                return

            # Poll the callback URL until the job has succeeded
            status = ""
            while (status != "succeeded"):
                time.sleep(3)
                response = requests.get(operation_location, headers=headers)
                status = response.json().get('status', '')

            # Get the results
            image_url = response.json().get('result', {}).get('data', [{}])[0].get('url', '')

            if not image_url:
                print("Failed to get the generated image URL.")
                return

            # Download the image
            image_response = requests.get(image_url)

            # Check if the request was successful
            if image_response.status_code == 200:
                # Display the downloaded image
                img = Image.open(io.BytesIO(image_response.content))
                img.show()
            else:
                print("Failed to download the image.")
        else:
            print("api_base is not defined.")

    except Exception as ex:
        print(ex)

def main():
    try:
        # Get Azure OpenAI Service settings
        load_dotenv()

        # Your existing code for scraping news articles
        bbc_news_url = 'https://www.bbc.com/news'
        articles = scrape_articles(bbc_news_url)

        if not articles:
            print("No articles found.")
            return

        # Summarize the news articles
        news_articles_text = "\n".join([article['headline'] for article in articles])
        summary = summarize_text_with_azure_openai(news_articles_text, max_tokens=50)

        if not summary:
            print("Failed to generate a summary.")
            return

        # Generate an image based on the summary
        generate_image(summary, api_base, api_key, api_version)

        # Your existing code for summarizing and displaying keywords
        keywords = extract_keywords(summary, top_n=5)

        # Result printing for news articles, summary, and keywords
        print("News Articles:")
        for i, article in enumerate(articles, start=1):
            print(f"Article {i}:")
            print("Headline:", article['headline'])
            print("Link:", article['link'])
            print()

        print("\nSummary:")
        print(summary)

        print("\nKeywords:")
        for keyword, score in keywords:
            print(f"Keyword: {keyword}, Score: {score}")

    except Exception as ex:
        print(ex)

if __name__ == '__main__':
    main()
