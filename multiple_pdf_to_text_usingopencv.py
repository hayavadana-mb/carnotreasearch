import platform
from pathlib import Path
from pdf2image import convert_from_path
import pytesseract
import cv2
import numpy as np
from PIL import Image
from tempfile import TemporaryDirectory

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    poppler_path = r"C:\poppler\Library\bin"
else:
    poppler_path = None  # Linux/macOS uses system Poppler

pdf_directory = Path("C:/Users/hayav/OneDrive/Desktop/asdsa/opencv")
pdf_files = list(pdf_directory.glob("*.pdf"))
if not pdf_files:
    raise FileNotFoundError(f"No PDF files found in directory: {pdf_directory}")

def preprocess_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
    _, binary = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # Binarization
    return binary

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

            text += pytesseract.image_to_string(Image.open(processed_img_path), lang="eng") + "\n\n"

        with open(output_text_file, "w", encoding="utf-8") as f:
            f.write(text)

    print(f"OCR complete! Text saved to {output_text_file}")

for pdf_file in pdf_files:
    if not pdf_file.exists():
        print(f"File not found: {pdf_file}")
        continue

    output_text_file = pdf_file.with_suffix(".txt")
    pdf_to_text(pdf_file, output_text_file)

