import asyncio
import json
import os
import sys
import edge_tts

# Фикс для корректной работы сокетов на Windows
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

MODULE_FILE = "class_7_character_lesson_2.json"
VOICE = "en-GB-RyanNeural"  # Британский мужской голос

async def main():
    if not os.path.exists(MODULE_FILE):
        print(f"[ОШИБКА] Файл {MODULE_FILE} не найден в текущей папке!")
        return

    with open(MODULE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    total = len(questions)
    print(f"Найдено {total} слов в модуле '{MODULE_FILE}'.\nНачинаем озвучку...\n")

    for index, item in enumerate(questions, start=1):
        # Превращаем 'a b s e n t - m i n d e d' -> 'absent-minded'
        word = item.get("en", "").replace(" ", "")
        audio_path = item.get("audioEnUrl", "")

        if not word or not audio_path:
            continue

        normalized_path = os.path.normpath(audio_path)
        os.makedirs(os.path.dirname(normalized_path), exist_ok=True)

        if os.path.exists(normalized_path) and os.path.getsize(normalized_path) > 0:
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