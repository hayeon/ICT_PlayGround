import React from 'react';
//css-in-js
// import style from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function Read() {
  const navigate = useNavigate();

    return (
    <div>
      <h1>게시판 글읽기</h1>
      <div>
        <h2>오늘의 하루는?</h2>
        <h4>오늘도 행복한 하루를 보냈다</h4>
        <Button style={{fontFamily:"SimKyungha"}} onClick={() => navigate("/")}>
        메인 페이지 보러가기
        </Button>  
      </div>
    </div>
  )
}

export default Read;