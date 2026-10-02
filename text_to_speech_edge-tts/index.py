import asyncio
import os
import edge_tts

# Список предложений для озвучки
sentences = [
    "I think my parents are really good-looking.",
  
    "My mum has green eyes and dark eyebrows.",
    "My mum's hair is straight and brown.",
    "My father is a lot taller than my mum!",
    "Dad has straight fair hair and blue eyes.",
    "Mum says he is really handsome.",
    "It's hard to say if I resemble my mum or dad.",
    "I have got short fair hair and blue eyes like my dad.",
    "My skin is pale and I don't have any freckles.",
   
]

# Британский мужской голос (отлично подходит для школы и рассказа от лица Арсения)
# Доступные варианты: 'en-GB-RyanNeural', 'en-GB-ThomasNeural' (подростковый), 'en-US-GuyNeural'
VOICE = "en-GB-RyanNeural"

# Папка, куда сохранятся файлы
OUTPUT_DIR = "arseniy_sentences_audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def main():
    print("Начинаем озвучку предложений...\n")
    for index, text in enumerate(sentences, start=1):
        filename = os.path.join(OUTPUT_DIR, f"{index}.mp3")
        
        # Создаем аудиопоток и сохраняем в файл
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(filename)
        print(f"[{index}/11] Сохранён: {filename}")
        print(f"       Текст: \"{text}\"")

    print(f"\nВсе 11 аудиофайлов успешно сохранены в папку '{OUTPUT_DIR}'!")

if __name__ == "__main__":
    asyncio.run(main())