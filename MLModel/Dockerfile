# FROM python:3.7.3-stretch



# WORKDIR /app

# COPY . .

# RUN python -m pip install --upgrade pip
# RUN pip install -r requirements.txt

# CMD ["python","app.py"]


FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install tesseract-ocr -y \
    python3 \
    #python-setuptools \
    python3-pip \
    && apt-get clean \
    && apt-get autoremove
    
RUN mkdir /app

# ADD . /home/App
WORKDIR /app
COPY requirements.txt ./
COPY . .


RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install --upgrade Pillow
RUN pip3 install -r requirements.txt

# VOLUME ["/data"]
ENTRYPOINT [ "python3" ]
CMD ["app.py"]
