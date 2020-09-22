docker build -t 100111/webuser:1.0.8 .
docker run -d -p 3002:3000 --name webuser:1.0.8 100111/webuser:1.0.8
docker push 100111/webuser:1.0.8
docker pull 100111/webuser:1.0.8
docker rm -f 100111/webuser:1.0.8

prod: 
docker run -d -p 80:3000 --name webuser-1.0.8 100111/webuser:1.0.8
