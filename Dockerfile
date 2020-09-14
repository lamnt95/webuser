FROM node:12.13-alpine

WORKDIR /webuser

COPY ./package.json ./yarn.* ./
RUN npm i
COPY . .
RUN npm run build && ls -a

EXPOSE 3000
CMD ["npm", "run", "start"]
