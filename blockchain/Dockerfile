FROM python:3.9.1-slim-buster

RUN mkdir /opt/my-blockchain
WORKDIR /opt/my-blockchain

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python3", "app.py"]