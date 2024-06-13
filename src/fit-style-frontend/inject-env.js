const fs = require('fs');
const path = require('path');

// 환경 변수를 가져옵니다.
const envVars = {
  REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
};

// 서비스 워커 파일 경로를 지정합니다.
const swFilePath = path.join(__dirname, 'public', 'firebase-messaging-sw.js');
let swFileContent = fs.readFileSync(swFilePath, 'utf8');

// 환경 변수를 파일 내용에 삽입합니다.
Object.keys(envVars).forEach(key => {
  const value = envVars[key];
  const regex = new RegExp(`REPLACE_WITH_${key}`, 'g');
  swFileContent = swFileContent.replace(regex, value);
});

// 수정된 파일 내용을 다시 씁니다.
fs.writeFileSync(swFilePath, swFileContent);
