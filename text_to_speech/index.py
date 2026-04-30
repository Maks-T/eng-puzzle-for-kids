from gtts import gTTS
import os

# Новые слова и названия файлов для модуля "Hobbies and Activities"
words = {
    "painting": "painting", 
    "collecting": "collecting",
    "making-models": "making models", 
    "keeping-pets": "keeping pets",
    "playing-chess": "playing chess", 
    "musical-instruments": "musical instruments",
    "diving": "diving", 
    "knitting": "knitting",
    "learning-languages": "learning languages", 
    "enjoyable": "enjoyable"
}

# Создаем папку для новых слов, если ее нет
os.makedirs("hobbies", exist_ok=True)

for filename, text in words.items():
    tts = gTTS(text, lang='en', tld='co.uk') # tld='co.uk' для британского акцента
    tts.save(f"hobbies/{filename}.mp3")
    print(f"Saved {filename}.mp3")