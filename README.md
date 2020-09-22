docker build -t 100111/webuser:1.0.7 .
docker run -d -p 3002:3000 --name webuser:1.0.7 100111/webuser:1.0.7
docker push 100111/webuser:1.0.7
docker pull 100111/webuser:1.0.7
docker rm -f 100111/webuser:1.0.7

prod: 
docker run -d -p 80:3000 --name webuser-1.0.7 100111/webuser:1.0.7
