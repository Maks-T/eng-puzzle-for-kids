import os
import json
from gtts import gTTS

# Список файлов модулей для обработки
MODULE_FILES = [
    "class_7_appearance_lesson_1.json",
    "class_7_appearance_lesson_2.json"
]

def generate_audio_for_modules():
    for file_name in MODULE_FILES:
        if not os.path.exists(file_name):
            print(f"[ПРОПУСК] Файл {file_name} не найден.")
            continue

        print(f"\n--- Обработка модуля: {file_name} ---")
        with open(file_name, "r", encoding="utf-8") as f:
            data = json.load(f)

        questions = data.get("questions", [])
        for item in questions:
            # Собираем слово из букв (убираем пробелы между буквами)
            # Например, 'c u r l y' -> 'curly', 'g o o d - l o o k i n g' -> 'good-looking'
            word = item.get("en", "").replace(" ", "")
            audio_path = item.get("audioEnUrl", "")

            if not word or not audio_path:
                continue

            # Нормализуем путь к файлу и создаем папки, если их нет
            normalized_path = os.path.normpath(audio_path)
            os.makedirs(os.path.dirname(normalized_path), exist_ok=True)

            if os.path.exists(normalized_path):
                print(f"[УЖЕ ЕСТЬ] {word} -> {normalized_path}")
                continue

            try:
                # Озвучиваем слово (британский акцент 'co.uk' под школьную программу)
                tts = gTTS(text=word, lang="en", tld="co.uk")
                tts.save(normalized_path)
                print(f"[ГОТОВО] '{word}' сохранён в {normalized_path}")
            except Exception as e:
                print(f"[ОШИБКА] Не удалось озвучить '{word}': {e}")

    print("\nОзвучка всех слов завершена!")

if __name__ == "__main__":
    generate_audio_for_modules()