docker build -t 100111/webuser:1.0.4 .
docker run -d -p 3002:3000 --name webuser:1.0.4 100111/webuser:1.0.4
docker push 100111/webuser:1.0.4
docker pull 100111/webuser:1.0.4
docker rm -f 100111/webuser:1.0.4

prod: 
docker run -d -p 80:3000 --name webuser-1.0.4 100111/webuser:1.0.4
