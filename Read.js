import React from 'react';
//css-in-js
import style from 'styled-components';
//import PangImage from '../assets/ggompang.jpeg' 
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import {ResultData} from '../assets/data/resultdata';

const Write= ()=> {
  const navigate = useNavigate();
  
    return (<Wrapper>
      <Headers>게시판 글읽기</Headers>
      <contents>
        <Title>오늘의 하루는?</Title>
        <LogoImage>
         <img src={ResultData[0].image}className="rounded-circle"width={350} height={350} ></img>
        </LogoImage>
        <Desc>오늘도 행복한 하루를 보냈다 {ResultData[0].name}</Desc>
        <Button style={{fontFamily:"SimKyungha"}} onClick={() => navigate("/")}>
        메인 페이지 보러가기
        </Button>  
      </contents>
    </Wrapper>
  )
}

export default Write;
