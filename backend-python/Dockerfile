FROM python:3.11

WORKDIR /app

COPY biblioteki.txt .
RUN pip install --no-cache-dir -r biblioteki.txt

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
