from gtts import gTTS
import os

# Словарь: "название_файла": "русское слово для озвучки"
words = {
    "kak-budto": "как будто",
    "karabkatsya": "карабкаться",
    "kacheli": "качели",
    "klaviatura": "клавиатура",
    "knigopechatanie": "книгопечатание",
    "kollega": "коллега",
    "koridor": "коридор",
    "krossovka": "кроссовка",
    "konfetti": "конфетти",
    "kottedzh": "коттедж",
    "lokot": "локоть",
    "marshrut": "маршрут",
    "makarony": "макароны",
    "medalion": "медальон",
    "milliard": "миллиард",
    "million": "миллион",
    "monitor": "монитор",
    "mototsikl": "мотоцикл",
    "oblast": "область",
    "olha": "ольха",
    "opryatny": "опрятный",
    "pavilion": "павильон",
    "pidzhak": "пиджак",
    "pirozhnoe": "пирожное",
    "predanie": "предание",
    "prezident": "президент",
    "prezidium": "президиум",
    "prezrenie": "презрение",
    "premirovat": "премировать",
    "premyera": "премьера",
    "znak-prepinaniya": "знак препинания",
    "prepyatstvie": "препятствие",
    "prestizhny": "престижный",
    "pretenziya": "претензия",
    "privilegiya": "привилегия",
    "priglashenie": "приглашение",
    "priyti": "прийти",
    "prilezhanie": "прилежание",
    "primer": "пример",
    "primitivny": "примитивный",
    "printsipialny": "принципиальный",
    "priroda": "природа",
    "prichina": "причина",
    "priyatel": "приятель",
    "populyarny": "популярный",
    "pochtalion": "почтальон",
    "pochtamt": "почтамт",
    "protokol": "протокол",
    "professiya": "профессия",
    "raschetlivy": "расчётливый",
    "reklama": "реклама",
    "remen": "ремень",
    "romashka": "ромашка",
    "sapog": "сапог",
    "svinoy": "свиной",
    "selfi": "селфи",
    "simmetriya": "симметрия",
    "spetsialnost": "специальность",
    "talant": "талант",
    "tatarskiy": "татарский",
    "treshchotka": "трещотка",
    "trista": "триста",
    "truzhenik": "труженик",
    "chetyresta": "четыреста",
    "shampinion": "шампиньон",
    "shakhmaty": "шахматы",
    "shinel": "шинель",
    "etiket": "этикет",
    "yunost": "юность",
    "yuny": "юный",
    "yasen": "ясень"
}

# Создаем папку russian, если её еще нет
output_folder = "russian"
os.makedirs(output_folder, exist_ok=True)

# Генерируем аудио для каждого слова
print("Начинаю генерацию аудиофайлов...")
for filename, text in words.items():
    # lang='ru' указывает, что озвучивать нужно на русском языке
    tts = gTTS(text, lang='ru')
    file_path = f"{output_folder}/{filename}.mp3"
    tts.save(file_path)
    print(f"Сохранено: {file_path} ({text})")

print("Готово! Все файлы успешно созданы в папке 'russian'.")