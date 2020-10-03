docker build -t 100111/webuser:1.0.21 . && docker push 100111/webuser:1.0.21
docker run -d -p 3002:3000 --name webuser:1.0.21 100111/webuser:1.0.21
docker push 100111/webuser:1.0.21
docker pull 100111/webuser:1.0.21  && docker run -d -p 80:3000 --name webuser-1.0.21 100111/webuser:1.0.21
docker rm -f 100111/webuser:1.0.21
git add . && git commit -m "1.0.21"

prod: 
docker run -d -p 80:3000 --name webuser-1.0.21 100111/webuser:1.0.21
