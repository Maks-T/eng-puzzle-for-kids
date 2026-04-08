from gtts import gTTS
import os

# Твои слова и названия файлов
words = {
    "action-film": "an action film", "romantic-film": "a romantic film",
    "adventure-film": "an adventure film", "western": "a western",
    "horror-film": "a horror film", "musical": "a musical",
    "cartoon": "a cartoon", "comedy": "a comedy",
    "boring": "boring", "shocking": "shocking",
    "surprising": "surprising", "fairy-tale": "a fairy tale",
    "detective": "a detective", "love-story": "a love story",
    "science-fiction": "science fiction", "fantasy": "a fantasy",
    "bookworm": "a bookworm"
}

# Создаем папку, если ее нет
os.makedirs("movies-books", exist_ok=True)

for filename, text in words.items():
    tts = gTTS(text, lang='en', tld='co.uk') # tld='co.uk' для британского акцента
    tts.save(f"movies-books/{filename}.mp3")
    print(f"Saved {filename}.mp3")