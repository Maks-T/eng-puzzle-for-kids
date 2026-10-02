import asyncio
import json
import os
import edge_tts

# Имя файла модуля
MODULE_FILE = "class_7_character_lesson_1.json"

# Британский мужской голос (стандарт для учебной программы)
# Также можно использовать британский женский: 'en-GB-SoniaNeural'
VOICE = "en-GB-RyanNeural"

async def main():
    if not os.path.exists(MODULE_FILE):
        print(f"[ОШИБКА] Файл {MODULE_FILE} не найден в текущей папке!")
        return

    with open(MODULE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    total = len(questions)
    print(f"Найдено {total} слов в модуле '{MODULE_FILE}'.\nНачинаем генерацию...\n")

    for index, item in enumerate(questions, start=1):
        # Превращаем 'a r r o g a n t' -> 'arrogant'
        word = item.get("en", "").replace(" ", "")
        audio_path = item.get("audioEnUrl", "")

        if not word or not audio_path:
            continue

        # Приводим путь к нормальному виду и создаем папку, если её нет
        normalized_path = os.path.normpath(audio_path)
        os.makedirs(os.path.dirname(normalized_path), exist_ok=True)

        if os.path.exists(normalized_path):
            print(f"[{index}/{total}] [ПРОПУСК] Уже есть: {normalized_path}")
            continue

        try:
            communicate = edge_tts.Communicate(word, VOICE)
            await communicate.save(normalized_path)
            print(f"[{index}/{total}] [ГОТОВО] '{word}' -> {normalized_path}")
        except Exception as e:
            print(f"[{index}/{total}] [ОШИБКА] '{word}': {e}")

    print("\nОзвучка всех слов модуля успешно завершена!")

if __name__ == "__main__":
    asyncio.run(main())