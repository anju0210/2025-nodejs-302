// express 모듈을 가져옵니다.
const express = require('express');

// express 애플리케이션을 생성합니다.
const app = express();

// 루트 경로('/')에 대한 GET 요청을 처리합니다.
app.get('/wow', (req, res) => {
  // 응답 본문에 'Hello, World!'를 보냅니다.
  res.send('get wow');
});

app.post('/wow', (req, res) => {
  // 응답 본문에 'Hello, World!'를 보냅니다.
  res.send('post wow');
});

// 서버가 포트 3000에서 요청을 대기합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000에서 실행 중입니다.');
});
