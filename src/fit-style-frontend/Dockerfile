# 베이스 이미지로 node를 사용
FROM node:20.14.0 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
ENV NODE_OPTIONS=--openssl-legacy-provider

# 빌드 인수를 환경 변수로 설정
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_VAPID_KEY
ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_VAPID_KEY=$REACT_APP_FIREBASE_VAPID_KEY
RUN npm run build

# Nginx를 사용하여 빌드 결과를 서빙
FROM nginx:alpine
COPY service-env.inc /etc/nginx/conf.d/service-env.inc
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
