// express 모듈을 가져옵니다.
const express = require('express');

// express 애플리케이션을 생성합니다.
const app = express();
const wowRouter = require('./routes/wow');

app.use(express.json()); //json 데이터 자동으로 파싱 후 req.body에 저장
app.use('/wow', wowRouter);

// 서버가 포트 3000에서 요청을 대기합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000에서 실행 중입니다.');
});
