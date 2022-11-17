FROM node:18.7.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", ".env", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]