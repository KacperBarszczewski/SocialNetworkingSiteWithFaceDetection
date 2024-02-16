FROM python:3.11

RUN apt-get update && apt-get install -y libgl1-mesa-glx

WORKDIR /app

COPY biblioteki.txt .
RUN pip install -r biblioteki.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
