import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickCityDep, clickCityDes } from '../../../store/contry';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import CitySearchList from './CitySearchList';
import { BASE_URL } from '../../../config';

const Arrive = ({ title, name }) => {
  const cityImageData = useSelector(state => state.cityImageData);
  const dispatch = useDispatch();
  const [cityInput, setCityInput] = useState('');
  const [citySearchData, setCitySearchData] = useState([]);

  const getCitySearchData = async () => {
    const res = await fetch('/data/ArriveCitySearchData.json').then(res =>
      res.json()
    );
    // const res = await fetch(`${BASE_URL}/flights/locations`).then(res =>
    //   res.json()
    // );
    setCitySearchData(res.result);
  };

  useEffect(() => {
    getCitySearchData();
  }, []);

  const sortedCities = citySearchData.filter(data => {
    return data.city_name.includes(cityInput);
  });

  if ((citySearchData.length & cityImageData.length) === 0)
    return <div>로딩중입니다.</div>;

  return (
    <ArriveArticle>
      <RightSection>
        <h1>{title}를</h1>
        <p>선택해주세요.</p>
      </RightSection>
      <CenterSection>
        <SearchInput changeCityData={e => setCityInput(() => e.target.value)} />
        <CitySearchList name={name} citySearchData={sortedCities} />
      </CenterSection>
      <LeftSection>
        <Text>국내</Text>
        <CityList>
          {cityImageData[0].map(({ id, img, city_name_ko }) => {
            return (
              <ImgDiv key={id}>
                <img
                  src={img}
                  alt={city_name_ko}
                  onClick={() => {
                    name === 'departure'
                      ? dispatch(clickCityDep(city_name_ko))
                      : dispatch(clickCityDes(city_name_ko));
                  }}
                />
                <p>{city_name_ko}</p>
              </ImgDiv>
            );
          })}
        </CityList>
      </LeftSection>
    </ArriveArticle>
  );
};

const ArriveArticle = styled.article`
  display: flex;
  justify-content: center;
  height: 430px;
  background-color: #fff;
`;

const RightSection = styled.section`
  width: 260px;
  height: 100%;
  background-color: #fff;
  padding-top: 48px;
  h1,
  p {
    line-height: 1.7rem;
    font-size: 24px;
    font-weight: bold;
  }
`;

const CenterSection = styled.section`
  width: 400px;
  height: 100%;
  padding-top: 48px;
  padding-left: 28px;
  padding-right: 25px;
  background-color: #fff;
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
`;

const LeftSection = styled.section`
  width: 400px;
  height: 100%;
  padding-top: 48px;
  padding-left: 28px;
  padding-right: 25px;
  background-color: #fff;
`;

const Text = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const CityList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImgDiv = styled.div`
  text-align: center;
  img {
    border-radius: 50%;
    margin: 8px;
    width: 70px;
    height: 70px;
  }
  p {
    padding-top: 5px;
    font-size: 13px;
    font-weight: 400;
    opacity: 0.65;
  }
`;

export default Arrive;
