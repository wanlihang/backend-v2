FROM node:lts-slim
WORKDIR /app/meedu-backend

COPY package.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org \
    && yarn

COPY . .

CMD ["yarn", "build"]