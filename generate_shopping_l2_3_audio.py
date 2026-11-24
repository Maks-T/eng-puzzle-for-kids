import asyncio
import json
import os
import edge_tts

MODULE_FILE = "class_7_shopping_lesson_2_3.json"
VOICE = "en-GB-RyanNeural"  # Британский мужской голос

async def main():
    if not os.path.exists(MODULE_FILE):
        print(f"[ОШИБКА] Файл '{MODULE_FILE}' не найден в текущей папке: {os.getcwd()}")
        return

    with open(MODULE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    total = len(questions)
    print(f"Найдено {total} элементов в модуле '{MODULE_FILE}'.\nНачинаем озвучку...\n")

    for index, item in enumerate(questions, start=1):
        raw_en = item.get("en", "")
        # Разделяем слова по тройному пробелу и склеиваем буквы каждого слова
        # 'a   b e l t' -> 'a belt', 'o l d - f a s h i o n e d' -> 'old-fashioned'
        words_parts = raw_en.split("   ") if "   " in raw_en else [raw_en]
        phrase = " ".join("".join(part.split()) for part in words_parts)

        audio_path = item.get("audioEnUrl", "")
        if not phrase or not audio_path:
            continue

        normalized_path = os.path.normpath(audio_path)
        os.makedirs(os.path.dirname(normalized_path), exist_ok=True)

        if os.path.exists(normalized_path) and os.path.getsize(normalized_path) > 0:
            print(f"[{index}/{total}] [ПРОПУСК] Уже есть: {normalized_path}")
            continue

        try:
            communicate = edge_tts.Communicate(phrase, VOICE)
            await communicate.save(normalized_path)
            print(f"[{index}/{total}] [ГОТОВО] '{phrase}' -> {normalized_path}")
        except Exception as e:
            print(f"[{index}/{total}] [ОШИБКА] '{phrase}': {e}")

    print("\nОзвучка всех слов модуля успешно завершена!")

if __name__ == "__main__":
    asyncio.run(main())