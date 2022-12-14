import React from 'react';
import styled from 'styled-components';

const CafeTap = () => {
  return (
    <ArriveDiv>
      <CenterDiv>
        <h1>
          카페는
          <br />
          준비중입니다.
        </h1>
      </CenterDiv>
    </ArriveDiv>
  );
};

const ArriveDiv = styled.section`
  display: flex;
  justify-content: center;
  height: 538px;
  background-color: #fff;
`;

const CenterDiv = styled.div`
  width: 800px;
  height: 100%;
  padding-top: 48px;
  padding-left: 28px;
  padding-right: 25px;
  background-color: #fff;
  text-align: center;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2rem;
    font-size: 24px;
    font-weight: bold;
  }
`;

export default CafeTap;
