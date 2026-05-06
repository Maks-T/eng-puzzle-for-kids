from gtts import gTTS
import os

# Новые слова и названия файлов для модуля "Holidays and Activities"
words = {
    "sightseeing": "sightseeing",
    "sunbathing": "sunbathing",
    "hunting": "hunting",
    "either": "either",
    "ideal": "ideal"
}

# Создаем папку для новых слов, если ее нет
os.makedirs("holidays", exist_ok=True)

for filename, text in words.items():
    tts = gTTS(text, lang='en', tld='co.uk') # tld='co.uk' для британского акцента
    tts.save(f"holidays/{filename}.mp3")
    print(f"Saved {filename}.mp3")