import pdfplumber
import fitz  # PyMuPDF
from langchain.document_loaders import PyMuPDFLoader

def extract_text_pdfplumber(pdf_path):
    """Extract text using pdfplumber (best for structured text and tables)."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:  # Avoid None values
                text += extracted_text + "\n"
    return text

def extract_text_pymupdf(pdf_path):
    """Extract text using PyMuPDF (fast and general-purpose)."""
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text("text") + "\n"
    return text

def extract_text_langchain(pdf_path):
    """Extract text using LangChain (for AI-based workflows)."""
    loader = PyMuPDFLoader(pdf_path)
    docs = loader.load()
    return "\n".join([doc.page_content for doc in docs])

def extract_text_from_pdf(pdf_path, method="pymupdf"):
    """
    Extract text from a PDF using the chosen method.
    Available methods: 'pymupdf', 'pdfplumber', 'langchain'
    """
    if method == "pdfplumber":
        return extract_text_pdfplumber(pdf_path)
    elif method == "pymupdf":
        return extract_text_pymupdf(pdf_path)
    elif method == "langchain":
        return extract_text_langchain(pdf_path)
    else:
        raise ValueError("Invalid method! Choose from 'pymupdf', 'pdfplumber', or 'langchain'.")

if __name__ == "__main__":
    pdf_path = "sample.pdf"  # Change this to your PDF file path
    
    # Choose method: 'pymupdf', 'pdfplumber', 'langchain'
    method = "pymupdf"
    
    extracted_text = extract_text_from_pdf(pdf_path, method)
    print("Extracted Text:\n", extracted_text)

    # Save extracted text to a file
    with open("output.txt", "w", encoding="utf-8") as f:
        f.write(extracted_text)
