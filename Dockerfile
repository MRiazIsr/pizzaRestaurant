FROM node:18.7.0
WORKDIR /app
COPY ["package.json", ".env", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]