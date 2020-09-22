docker build -t 100111/webuser:1.0.9 .
docker run -d -p 3002:3000 --name webuser:1.0.9 100111/webuser:1.0.9
docker push 100111/webuser:1.0.9
docker pull 100111/webuser:1.0.9
docker rm -f 100111/webuser:1.0.9
git add . && git commit -m "1.0.9"

prod: 
docker run -d -p 80:3000 --name webuser-1.0.9 100111/webuser:1.0.9
