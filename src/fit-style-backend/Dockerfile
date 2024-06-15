FROM amazoncorretto:11-alpine-jdk

# 필수 패키지 설치 및 크롬 브라우저 114 버전 설치
RUN apk --no-cache add \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    wget \
    bash \
    udev \
    ttf-opensans \
    chromium \
    chromium-chromedriver

ARG JAR_FILE=target/*.jar
ARG PROFILES
ARG ENV

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILES}", "-Dserver.env=${ENV}", "-jar", "app.jar"]
