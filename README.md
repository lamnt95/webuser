docker build -t 100111/webuser:1.0.31 . && docker push 100111/webuser:1.0.31
docker run -d -p 3002:3000 --name webuser:1.0.31 100111/webuser:1.0.31
docker push 100111/webuser:1.0.31
docker pull 100111/webuser:1.0.31  && docker run -d -p 80:3000 --name webuser-1.0.31 100111/webuser:1.0.31
docker rm -f 100111/webuser-1.0.31
docker rm -f webuser-1.0.21
git add . && git commit -m "1.0.31" && git push

prod: 
docker run -d -p 80:3000 --name webuser-1.0.31 100111/webuser:1.0.31
