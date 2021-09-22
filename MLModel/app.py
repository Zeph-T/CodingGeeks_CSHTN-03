# TODO : Implement the Basic APIs for ML text extraction
import os
import re
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from flask import Flask,request,jsonify
from flask_cors import CORS
import nltk
import os
nltk.download('stopwords')
from nltk.corpus import stopwords
from Classes.textExtraction import textExtraction
import string
punct = set(string.punctuation)

stop_words = set(stopwords.words('english'))


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    statement = 'Hello World!'
    return statement
@app.route('/getText',methods = ['POST'])
def extraction():
    data = request.json
    text = textExtraction(data['image_url'])
    words_array = [w for w in text.split() if (not w in stop_words) and (not w in punct) and (len(w)>3)]
    return  jsonify(result = words_array)


port = int(os.environ.get("PORT", 5000)) 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port,debug=True)
