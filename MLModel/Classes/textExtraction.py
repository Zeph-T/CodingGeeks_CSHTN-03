from PIL import Image, ImageEnhance
import pytesseract
import requests
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def textExtraction(image_url):

    words = []
    image = Image.open(requests.get(image_url, stream=True).raw)
    enhancer1 = ImageEnhance.Sharpness(image)
    enhancer2 = ImageEnhance.Contrast(image)
    img_edit = enhancer1.enhance(20.0)
    img_edit = enhancer2.enhance(1.5)

    result = pytesseract.image_to_string(img_edit)

    return result


