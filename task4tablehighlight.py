import platform
from pathlib import Path
from pdf2image import convert_from_path
import pytesseract
import cv2
import numpy as np
from PIL import Image
from tempfile import TemporaryDirectory
import re

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    poppler_path = r"C:\poppler\Library\bin"
else:
    poppler_path = None  # Linux/macOS uses system Poppler

pdf_directory = Path("C:/Users/hayav/OneDrive/Desktop/asdsa/asas")
pdf_files = list(pdf_directory.glob("*.pdf"))
if not pdf_files:
    raise FileNotFoundError(f"No PDF files found in directory: {pdf_directory}")

def preprocess_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
    _, binary = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # Binarization
    return binary

def detect_tables(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)
    
    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    table_texts = []
    
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if w > 50 and h > 20:  # Assume tables have larger rectangular areas
            roi = image[y:y+h, x:x+w]
            text = pytesseract.image_to_string(roi, config="--psm 6")
            table_texts.append(f"[TABLE] {text.strip()} [TABLE]")
    
    return table_texts

def highlight_keywords(text):
    text = re.sub(r"\b(T|t)able\b", r"[HIGHLIGHT] \g<0> [HIGHLIGHT]", text)
    text = re.sub(r"\b(F|f)ig(ure)?\b", r"[HIGHLIGHT] \g<0> [HIGHLIGHT]", text)
    return text

def pdf_to_text(pdf_path, output_text_file):
    with TemporaryDirectory() as tempdir:
        images = convert_from_path(pdf_path, dpi=300, poppler_path=poppler_path)
        text = ""

        for i, image in enumerate(images, 1):
            img_path = Path(tempdir) / f"page_{i}.png"
            image.save(img_path, "PNG")

            processed_img = preprocess_image(str(img_path))
            processed_img_path = Path(tempdir) / f"processed_page_{i}.png"
            cv2.imwrite(str(processed_img_path), processed_img)

            page_text = pytesseract.image_to_string(Image.open(processed_img_path), lang="eng")
            page_text = highlight_keywords(page_text)
            text += page_text + "\n\n"
            
            table_texts = detect_tables(str(processed_img_path))
            if table_texts:
                text += "\n".join(table_texts) + "\n\n"

        with open(output_text_file, "w", encoding="utf-8") as f:
            f.write(text)

    print(f"OCR complete! Text saved to {output_text_file}")

for pdf_file in pdf_files:
    if not pdf_file.exists():
        print(f"File not found: {pdf_file}")
        continue

    output_text_file = pdf_file.with_suffix(".txt")
    pdf_to_text(pdf_file, output_text_file)
