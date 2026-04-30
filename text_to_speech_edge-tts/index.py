import asyncio
import edge_tts
import os

dialogue =[
    ("Nick", "Hi, Yan! You watch many films, don't you? Can you recommend a good film to watch?"),
    ("Yan", "Well, yes. I recently watched a film called Gamer's Rules. It's about three friends, who spend all their time playing computer games."),
    ("Nick", "Oh, I don't think I've seen this film. Is it a fantasy or mystery film?"),
    ("Yan", "It's a fun adventure. One day, the boys find something mysterious, and their action begins. I enjoyed watching it, you know?"),
    ("Nick", "That's interesting. Is it a Hollywood film?"),
    ("Yan", "No, it is filmed in Belarus in 2018 by Igor Chetverikov. And the actors did all the tricks themselves."),
    ("Nick", "Thanks, Yan. That's what I'm going to watch today. I must go now. See you later!"),
    ("Yan", "Enjoy your film, Nick! Bye!")
]

# Выбираем два разных мужских голоса
# 'en-US-GuyNeural' - американский мужской
# 'en-GB-RyanNeural' - британский мужской
voices = {
    "Nick": "en-GB-RyanNeural",
    "Yan": "en-US-GuyNeural"
}

os.makedirs("dialogue_audio_edge", exist_ok=True)

async def main():
    for index, (speaker, text) in enumerate(dialogue, start=1):
        voice = voices[speaker]
        filename = f"dialogue_audio_edge/{index}_{speaker}.mp3"
        
        # Генерируем и сохраняем аудио
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(filename)
        print(f"Saved {filename} ({voice})")

# Запускаем асинхронную функцию
asyncio.run(main())