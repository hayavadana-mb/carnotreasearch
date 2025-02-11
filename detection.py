from langdetect import detect, DetectorFactory, detect_langs

# Ensuring consistent results
DetectorFactory.seed = 0

def detect_language(text):
    try:
        lang = detect(text)
        return lang
    except Exception as e:
        return str(e)

def detect_language_probabilities(text):
    try:
        langs = detect_langs(text)
        return langs  # Returns a list of languages with probabilities
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    text = input("Enter text: ")
    print(f"Detected Language: {detect_language(text)}")
    print(f"Language Probabilities: {detect_language_probabilities(text)}")
