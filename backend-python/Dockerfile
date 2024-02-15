FROM python:3.9

WORKDIR /app

COPY biblioteki.txt .
RUN pip install --no-cache-dir -r biblioteki.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
