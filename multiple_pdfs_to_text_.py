import platform
from pathlib import Path
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
from tempfile import TemporaryDirectory

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  
    poppler_path = r"C:\poppler\Library\bin" 
else:
    poppler_path = None  # Linux/macOS uses system Poppler

pdf_directory = Path("C:/Users/hayav/OneDrive/Desktop/asdsa") 
pdf_files = list(pdf_directory.glob("*.pdf"))
if not pdf_files:
    raise FileNotFoundError(f"No PDF files found in directory: {pdf_directory}")

def pdf_to_text(pdf_path, output_file):
    with TemporaryDirectory() as tempdir:
        images = convert_from_path(pdf_path, dpi=300, poppler_path=poppler_path)
        
        text = ""  
        
        for i, image in enumerate(images, 1):
            img_path = Path(tempdir) / f"page_{i}.jpg"
            image.save(img_path, "JPEG")

            text += pytesseract.image_to_string(Image.open(img_path), lang="eng") + "\n\n"
        
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(text)
    
    print(f" OCR complete! Text saved to {output_file}")

for PDF_file in pdf_files:
    if not PDF_file.exists():
        print(f"File not found: {PDF_file}")
        continue

    output_text_file = PDF_file.with_suffix(".txt")
    
    pdf_to_text(PDF_file, output_text_file)
