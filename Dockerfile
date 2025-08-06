FROM node:22-alpine

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5174

CMD ["npx", "vite", "preview", "--port", "5174", "--host"]