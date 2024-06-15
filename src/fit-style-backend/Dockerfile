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
    ttf-opensans

# 크롬 설치
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || true \
    && apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb

# chromedriver 설치
RUN wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip

ARG JAR_FILE=target/*.jar
ARG PROFILES
ARG ENV

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILES}", "-Dserver.env=${ENV}", "-jar", "app.jar"]
