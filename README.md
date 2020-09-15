docker build -t 100111/webuser:1.0.1 .
docker run -d -p 3002:3000 100111/webuser:1.0.1
docker push 100111/webuser:1.0.1
