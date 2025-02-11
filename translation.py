from google.cloud import translate_v2 as translate

def translate_text(text, target_lang="en"):
    try:
        client = translate.Client()
        result = client.translate(text, target_language=target_lang)
        return result["translatedText"]
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    chhattisgarhi_text = input("Enter Chhattisgarhi text: ")
    translated_text = translate_text(chhattisgarhi_text, "en")
    print(f"Translated Text: {translated_text}")
