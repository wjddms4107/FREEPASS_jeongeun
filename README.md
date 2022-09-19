# 2차 프로젝트 "FREEPASS"
> JEJUPASS 웹 사이트를 모티브하여 만든 항공권 구메 사이트 </br>
> [FREEPASS 영상](https://youtu.be/S5ElqSBUMzM)

#### [노정은 기술 블로그](https://jeongeuni.tistory.com/)

## 1. 제작 기간 & 참여 인원
-  2022년 8월 1일(월) ~ 2022년 8월 12일(금) : 총 10일
- Front-End : 🐥 노정은, 🐶 엄성훈, 🐱 이현주, 🦆 이혜진</br>
Back-end : ⚽️ 손찬규, 🦅 박정용


## 2. 사용 기술
- React
- Redux-toolKit ([수료 후 AirModal페이지 Redux-toolKit로 리팩토링](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/store/store.js#L7))
- Javascript
- Styled-component
- AWS (배포하였지만 요금부과 문제로 내린 상태)
- 라이브러리 : 카카오 로그인 (OAuth2.0), 카카오 맵 API, swiper, datePicker, react modal, anti desigh, react spinner


## 3. 핵심 기술

#### `JEJUPASS 웹 싸이트를 모티브한 팀 프로젝트`
- 제주패스는 제주 여행의 슈퍼 앱으로 전세계 실시간 최저가 항공, 제주 맛집까지 제주도 여행의 모든 것을 확인할 수 있는 웹 사이트 입니다.
- 저희는 그 중에서도 '항공 페이지'에 집중하여 구현하였습니다.
- 또한 '깨깨오항공', '코팡항공' 등으로 정해놓고 이 기업들을 향해 날아가는 컨셉으로 재미있게 구성해보았습니다.

#### `구현 기능`
- 구현한 기능을 간략하게 소개하자면<br />
카카오 로그인 -> 항공권 옵선 선택 후 조회 -> 항공권 선택 후 예약<br />
항공 사이트의 기본적인 FLOW를 갖추고 있습니다.

#### `개발 내용`
- Navigation Bar
- Footer
- 회원가입, 로그인 페이지
- 메인 페이지 
- 지도 페이지
- ESG 페이지
- 항공 메인 페이지
- 항공 모달 (항공권 옵션 선택) ▶️ FE노정은
- 항공권 리스트 페이지 ▶️ FE노정은
- 항공권 예약 및 결제 페이지
- 로딩 페이지 ▶️ FE노정은

#### `프론트, 백엔드 깃허브`
> [팀 프로젝트 프론트엔드 GitHub](https://github.com/wecode-bootcamp-korea/35-2nd-FREEPASS-frontend)<br/>
> [팀 프로젝트 백엔드 GitHub](https://github.com/wecode-bootcamp-korea/35-2nd-FREEPASS-backend)


## 4. 문제 해결 경험
#### 4-1. 항공모달은 menu Tap 지옥 [코드로 이동](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/pages/airModal/AirModal.js#L9)
<img width="500" alt="스크린샷 2022-09-16 오전 11 21 56" src="https://user-images.githubusercontent.com/78889402/190542763-8ef9301d-6cc4-4433-82e8-38a3356a0dda.png">

- 항공 모달에서 항공권의 옵션들(출발지, 도착지, 탑승일, 인원 및 좌석 등급)을 선택하여 항공권을 조회할 수 있고 선택한 옵션을 가지고 항공권 리스트 페이지로 넘어갑니다.
- 선택할 것이 많은 항공 모달은 menu Tap 지옥이었습니다. 첫 번째로 항공, 자동차, 숙박, 맛집, 카페의 menu tap이 있고 두 번째로는 항공 메뉴를 눌렀을 때 나오는 항공 옵션에 대한 tap 기능이 또 있습니다.
- 먼저 항공, 자동차, 숙박, 맛집, 카페의 각 아이콘을 눌렀을 때 해당하는 탭으로 바뀌어야 했습니다. 이에 각 탭을 컴포넌트화하고 MAPPING_OBJ라는 상수 데이터를 만들어 key가 1이면 `<AirPlainTap />`로 가는 식으로 세팅을 해주었습니다.
- 또한 초깃값이 1인 currentId라는 state를 만들고 해당 아이콘을 클릭하면 currentId를 바꿔주는 clickHandler 함수를 생성한 뒤 아이콘을 배열로 만들어 map을 돌리고 배열의 index를 이용하여 알맞은 아이콘과 tap을 불러올 수 있도록 구현하였습니다.
- 항공 탭에서의 menu Tap은 출발, 도착, 탑승일, 인원 및 좌석 등급으로 구성됩니다. 이 또한 위와 비슷하게 '출발'을 클릭 시 currentId가 1로 바뀌며 {MAPPING_OBJ[1]}가 되고 MAPPING_OBJ 객체의 1번인 Arrive 탭으로 이동하게 되는 로직입니다.
- 이번에 menu Tap 지옥을 겪으며 확실히 내 기술로 만들고 넘어간 것이 무척 인상 깊습니다.

<details>
<summary><b>menu Tap 구현코드</b></summary>
<div markdown="1">
  
~~~javascript
const AirModal = ({ closeModal }) => {
  //currentId의 현재값은 1이다.
  const [currentId, setCurrentId] = useState(1);
  
  //해당 메뉴를 클릭하면 currentId를 바꿔주는 함수이다.
  const clickHandler = id => {
    setCurrentId(id);
  };

  return (
    <>
      <UlDiv>
        <DeleteButton onClick={closeModal}>X</DeleteButton>
        <IconUl>
          //각 아이콘을 배열로 만들어 map을 돌리고 배열의 Index값을 이용하였다.
          {ICON_ARR.map((cate, idx) => {
            return (
              <IconLi
                key={idx}
                className={cate}
                //클릭하면 해당 index값에 +1을 한 값이 currentId 들어가게 된다.
                onClick={e => clickHandler(idx + 1)}
                primary={currentId === idx + 1}
              >
                //메뉴 탭의 아이콘도 배열로 담았는데 CATEGORY_ARR의 index값을 이용하여 알맞은 아이콘을 보여주게했다.
                {ICON_ARR[idx]}
              </IconLi>
            );
          })}
        </IconUl>
      </UlDiv>
      //MAPPING_OBJ는 컴포넌트를 객체로 만들어 준 것인데 위의 클릭이벤트에 의해 currentId가 바뀌며 알맞은 tap을 불러준다.
      <div>{MAPPING_OBJ[currentId]}</div>
    </>
  );
};

const MAPPING_OBJ = {
  1: <AirPlainTap />,
  2: <CarTap />,
  3: <SleepTap />,
  4: <ShopTap />,
  5: <CafeTap />,
};


const ICON_ARR = [
  <i key={1} className="fa-solid fa-plane" />,
  <i key={2} className="fa-solid fa-car" />,
  <i key={3} className="fa-solid fa-bed" />,
  <i key={4} className="fa-solid fa-tag" />,
  <i key={5} className="fa-solid fa-mug-saucer" />,
];
~~~
  
</div>
</details>

#### 4-2. 출발지, 도착지 사진 선택 & 검색 기능 -> [현재는 Redux-toolKit으로 리팩토링 되었습니다!](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/store/contry.js#L3)
<img width="400" alt="스크린샷 2022-09-16 오전 11 24 42" src="https://user-images.githubusercontent.com/78889402/190543069-1fa42fc4-27a3-493b-b440-8d7c441a80a2.png">


- 이미지를 클릭하고 원하는 도시를 검색하여 클릭해도 옵션이 선택되며 도시에 해당하는 영어 네임도 함께 반영됩니다.
- 즉, 클릭 이벤트의 event.target으로 구현해야 하는데 항상 name 속성을 이용했지만 검색 기능에서는 클릭되는 태그가 p 태그여서 name 속성이 없었고 어떤 속성을 이용해야 하나 아니면 다른 방법을 고안해야 하나 고민을 많이 했습니다.
- console로 찍어 p태그에는 어떠한 속성이 있는지 살펴보았고 이에 p태그에는 id속성이 있다는 것을 찾을 수 있었습니다.
- 결국 해당 도시가 반영되게 하기 위해 사진은 e.target.value의 name속성, 검색 기능에서는 e.target.value의 id속성을 이용하여 구현할 수 있었습니다.
- 또한 해당 도시에 맞는 영어 네임도 함께 반영했는데 이는 도시에 해당하는 영어 네임을 객체로 만들어 구현하였습니다.

<details>
<summary><b>도시를 클릭하면 해당 도시가 반영되게 하기</b></summary>
<div markdown="1">
  
~~~javascript
const clickImgDiv = (e, cityName) => {
  const { name } = e.target;
  setContry(prev => ({ ...prev, [name]: cityName }));
};

const clickCity = (e, cityName) => {
  const { id } = e.target;
  setContry(prev => ({ ...prev, [id]: cityName }));
};
~~~
  
</div>
</details>

<details>
<summary><b>해당 도시에 맞는 영어 네임도 함께 반영되게 하기</b></summary>
<div markdown="1">

~~~javascript
<Panel width="180px" onClick={() => clickHandler(1)}>
  <Text>출발</Text>
  <Button>
    <Text>
      {departure}
      <span>{CITYNAME_EN_DATA[departure]}</span>
    </Text>
  </Button>
</Panel>
<Panel width="180px" onClick={() => clickHandler(2)}>
  <Text>도착</Text>
  <Button>
    <Text>
      {destination}
      <span>{CITYNAME_EN_DATA[destination]}</span>
    </Text>
  </Button>
</Panel>

// 도시에 해당하는 영어네임을 객체로 만든 일부
const CITYNAME_EN_DATA = {
    서울: 'SEL',
    제주: 'CJU',
    김포: 'GMP',
    부산: 'PUS',
    제네바: 'GVA',
    콘제도: 'RNI',
},
~~~
  
</div>
</details>

<details>
<summary><b>Redux-toolKit으로 리팩토링</b></summary>
<div markdown="1">

~~~javascript
// store
let contry = createSlice({
  name: 'contry',
  initialState: { departure: '김포', destination: '어디로 떠나시나요?' },
  reducers: {
    clickCityDep(state, action) {
      state.departure = action.payload;
    },
    clickCityDes(state, action) {
      state.destination = action.payload;
    },
  },
});
-------------------
// 활용
onClick={() => {
  name === 'departure'
    ? dispatch(clickCityDep(city_name))
    : dispatch(clickCityDes(city_name));
}}
~~~

- action.payload로는 도시이름을 보내야하기에 기존의 name,id 속성을 어떻게 활용할 수 있을까 고민을 했습니다.
- 고민 후 내린 결론은 값이 'departure' or 'destination' 단 두 개 이기때문에 삼항연산자를 활용하여 구현했습니다.

</div>
</details> 

#### 4-3. 캘린더 라이브러리(Datepicker)를 이용한 날짜 선택 기능
<img width="400" alt="스크린샷 2022-09-16 오전 11 23 50" src="https://user-images.githubusercontent.com/78889402/190542966-7332350c-93c1-4f62-ae8f-e25fa5a6733b.png">

- 2차 프로젝트를 하면서 가장 도전적인 부분은 캘린더 라이브러리를 사용하는 것이었습니다. 라이브러리를 처음 시도해보았기 때문입니다.
- Datepicker를 이용하여 출발일, 도착일을 선택하면 탑승일에 해당 날짜가 표시되고 캘린더도 화이트 앤 블루로 커스텀해야 했습니다.
- 이에 공식문서를 뜯어보았습니다. 공식문서에는 여러 예시가 많이 나와있었고 저는 연속된 두 개의 월이 나오는 캘린더가 필요하여 'Multiple months' 기능이 되는 걸로 가져와 구현할 수 있었습니다.
- 또한 onchange함수에 많은 수식들이 있는데 이는 선택된 날짜의 date함수를 원하는 형태로 가공하고 이 값을 state로 활용하여 탑승일에 반영하였습니다. [코드로 이동](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/pages/airModal/filterBar/Dep.js#L18) 
- [캘린더 라이브러리에 대한 기술 블로그](https://jeongeuni.tistory.com/51)

#### 4-4. 선택한 옵션들을 담아 보내는 query parameter [코드](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/pages/airModal/AirPlainTap.js#L23)
- 항공 모달에서 무엇을 선택했는지 그 정보를 내 다음 페이지인 항공권 리스트 페이지에 보내줘야 했습니다.
- 옵션 정보는 quert String으로 보내주면 되는데 다만 backend에서 `22.08.13(토) -> 2022-08-13 / 전체 -> 'normal' , 비즈니스 -> 'business' / 편도 ->'one_way' , 왕복 -> 'round_trip'` 이렇게 데이터를 보내달라고 요청을 했습니다.
- 또한 편도면 출발지만 보내주고 왕복이면 출발지와 도착지 모두를 보내야 했습니다.

<details>
<summary><b>가공한 쿼리파라미터</b></summary>
<div markdown="1">
  
~~~javascript
const goToAirList = () => {
    setIsLoading(true); //loading page를 위한 부분
    const departure_date = hyphenBoardStartDay.slice(0, 8); //출발일 22-08-14 형식으로 가공
    const arrival_date = hyphenBoardEndDay.slice(0, 8); //도착일 22-08-14 형식으로 가공
    const seat_class = rating === '전체' ? 'normal' : 'business'; //좌석등급 'normal', 'business' 형식으로 가공
    const ticket_type = searchSort === '편도' ? 'one_way' : 'round_trip'; //backend에서 편도인지 왕복인지 알 수 있게 'one_way', 'round_trip' 가공 
    
    //왕복일 때는 출발지만 보내주고 왕복일 때는 도착지,출발지 모두 보내기
    const oneWayQueryString = `?ticket_type=${ticket_type}&departure_location=${departure}&arrival_location=${destination}&departure_date=${`20${departure_date}`}&adult=${adult}&infant=${child}&child=${baby}&remaining_seat=${seat_class}`;
    const roundTripQueryString = oneWayQueryString + `&departure_date=${`20${arrival_date}`};
    const finalQueryString =
      ticket_type === 'one_way' ? oneWayQueryString : roundTripQueryString;
      
    //setTimeout은 loading page를 위한 부분
    setTimeout(() => {
      setIsLoading(false);
      //위에서 가공한 데이터를 퀴르스트링으로 담아주기
      navigate(`/airmodal${finalQueryString}`);
      navigate(`/airlist${finalQueryString}`);
      fetch(`${BASE_URL}/flights/schedules${location.search}`);
    }, 5000);
  };
~~~
  
</div>
</details>

## 5. 더 나은 코드로의 고민 (수료 후 리팩토링) 
### 5-1. Redux-toolKit으로 리팩토링
- 기존에 react state로만 상태 관리할 때는 부모 요소에서 모든 state를 관리해야 했기에 코드가 지저분하고 길었습니다. 또한 많은 state를 각종 탭에 보내려니 props로 전달해야 하는 것이 너무 많았습니다. 이는 가독성을 떨어트려 내가 무엇을 props로 왜 전달하고 있는지도 알아채기 어려웠고 상태 관리의 비효율을 보여주는 것 같았습니다.
- Redux-toolKit을 적용해야 함을 깨달았고 Redux-toolKit을 공부하여 FREEPASS에 적용시켰습니다. 실제로 적용시키니 코드가 훨씬 깔끔해졌고 왜 상태 관리 라이브러리를 사용하는지 뼈저리게 느낄 수 있었습니다.
- [기존의 코드](https://github.com/wjddms4107/FREEPASS-frontend/blob/39a2524aafc26027ce4a1be8467e2a7f4f3686c8/src/pages/airModal/AirPlainTap.js#L10) -> [redux-toolkit적용 코드](https://github.com/wjddms4107/FREEPASS-frontend/blob/feature/develop/src/pages/airModal/AirPlainTap.js#L12)

<details>
<summary><b>기존의 코드(props 전달)</b></summary>
<div markdown="1">

~~~javascrpt
const MAPPING_OBJ = {
   1: (
     <Arrive
       data="출발지"
       name="departure"
       cityData={cityData}
       clickImgDiv={clickImgDiv}
       clickCity={clickCity}
     />
   ),
   2: (
     <Arrive
       data="도착지"
       name="destination"
       cityData={cityData}
       clickImgDiv={clickImgDiv}
       clickCity={clickCity}
     />
   ),
   3: (
     <Dep
       changeBoardStartDay={changeBoardStartDay}
       changeBoardEndDay={changeBoardEndDay}
       changeSearchSort={changeSearchSort}
     />
   ),
   4: (
     <People
       plusPassengerNumber={plusPassengerNumber}
       minusPassengerNumber={minusPassengerNumber}
       changeRating={changeRating}
       passengerInfo={passengerInfo}
     />
   ),
};
~~~

</div>
</details>

<details>
<summary><b>redux-toolkit적용 코드</b></summary>
<div markdown="1">

~~~javascrpt
const MAPPING_OBJ = {
  1: <Arrive title="출발지" name="departure" />,
  2: <Arrive title="도착지" name="destination" />,
  3: <Dep />,
  4: <People />,
};
~~~

</div>
</details>

### 5-2. 더 나은 방법은 있으니 구글링을 해보자 & 비슷한 코드는 함수로 관리하자
#### [리팩토링 전](https://github.com/wjddms4107/FREEPASS-frontend/blob/39a2524aafc26027ce4a1be8467e2a7f4f3686c8/src/pages/airModal/filterBar/Dep.js#L7)
- 탑승일을 구현할 때 `Thu Sep 01 2022 09:50:38 GMT+0900 (한국 표준시)`형식의 date객체를 `22.09.10(월)`형식으로 만들어야했습니다.
- 또한 backend와 통신을 할 때는 `22.09.10(월)`형식을 `2022-09-10`으로 바꿔서 보내야했습니다. 이에 replace메서드를 활용하여 모든 "."을 "-"로 대체하려 했지만 replace메서드는 맨 앞의 한 "."만 바꿔주었고 할 수 없이 hyphenFinalStartDate라는 변수를 하나더 만들었습니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~javascrpt
//`22.09.10(월)`형식으로 만들기
const Dep = ({ changeBoardStartDay, changeBoardEndDay, changeSearchSort }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const year = start.getFullYear().toString().slice(2);
    const month = start.getMonth() + 1;
    const day = start.getDate();
    const weekday = start.toString().slice(0, 3);
    const weekdayToKo = WEEKDAY_TO_KO.map(data => {
      return data[weekday];
    });

    const finalStartDate = `${year}.${month >= 10 ? month : '0' + month}.${
      day >= 10 ? day : '0' + day
    }(${weekdayToKo})`;

    const hyphenFinalStartDate = `${year}-${
      month >= 10 ? month : '0' + month
    }-${day >= 10 ? day : '0' + day}(${weekdayToKo})`;

    const endYear = end.getFullYear().toString().slice(2);
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();
    const endWeekday = end.toString().slice(0, 3);

    const endweekdayToKo = WEEKDAY_TO_KO.map(data => {
      return data[endWeekday];
    });

    const finalEndDate = `${endYear}.${
      endMonth >= 10 ? endMonth : '0' + endMonth
    }.${endDay >= 10 ? endDay : '0' + endDay}(${endweekdayToKo})`;

    const hyphenFinalEndDate = `${endYear}-${
      endMonth >= 10 ? endMonth : '0' + endMonth
    }-${endDay >= 10 ? endDay : '0' + endDay}(${endweekdayToKo})`;

    changeBoardStartDay(finalStartDate, hyphenFinalStartDate);
    changeBoardEndDay(finalEndDate, hyphenFinalEndDate);
    changeSearchSort(finalStartDate, finalEndDate);
};
---------------  


~~~

</div>
</details>

#### [리팩토링 후](https://github.com/wjddms4107/FREEPASS-frontend/blob/b4fab451a03facbc0e56894c9f9c72c7db028166/src/pages/airModal/filterBar/Dep.js#L13)
- finalStartDate와 finalEndDate을 구할 때 start와 end만 다르고 모두 같은 형식이기에 함수로 관리하였습니다.
- 또한 backend와 통신을 위해 "."을 "-"로 바꾸는데 너무 많은 코드가 쓰이는 거 같았고 분명히 방법이 있을거라 생각했습니다. 이에 구글링에 들어갔고 정규식을 사용하는 방법이 있었습니다.
- 프로젝트를 할 때는 너무 정신이 없었고 지금보다 더 아가개발자였기에 이렇게 할 생각을 못했던 것 같습니다. 더 좋은 코드로 만들기 위해 고민하는 시간을 통해 성장하고 있음을 느꼈고 더 성장하여 효율성 높은 코드를 짤 수 있는 개발자로 성장하고 싶습니다.

<details>
<summary><b>리팩토링 후의 코드</b></summary>
<div markdown="1">

~~~javascrpt
// 함수로 관리하기
const onChange = dates => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);

  function setBoardDate(startOrEnd) {
    const year = startOrEnd.getFullYear().toString().slice(2);
    const month = startOrEnd.getMonth() + 1;
    const day = startOrEnd.getDate();
    const weekday = startOrEnd.toString().slice(0, 3);
    const weekdayToKo = WEEKDAY_TO_KO.map(data => {
      return data[weekday];
    });
    const finalDate = `${year}.${month >= 10 ? month : '0' + month}.${
      day >= 10 ? day : '0' + day
    }(${weekdayToKo})`;
    return finalDate;
  }

  dispatch(setBoardStartDay(setBoardDate(start)));
  dispatch(setBoardEndDay(setBoardDate(end)));
  dispatch(
    setBoardDate(start) === setBoardDate(end)
      ? setSearch('편도')
      : setSearch('왕복')
  );
};
----------------
// 정규식 사용하기
const departure_date = boardStartDay.slice(0, 8).replace(/\./g, '-'); //"22.09.22(목)" -> "22-09-22"형식으로 바꾸기
~~~

</div>
</details>



## 6. 🎥 각 페이지별 View
> [유튜브 데모 영상](https://youtu.be/S5ElqSBUMzM)

<table>
  <thead>
    <tr>
      <th>
        메인페이지
      </th>
      <th>
        ESG페이지
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546658-d0c71996-a9b8-442d-9f75-5b6d8e1f181a.png">
      </td>
      <td align="center">
          <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546668-7a340397-a975-4c72-814a-fc2712aa13ce.jpg">
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        항공페이지
      </th>
      <th>
        로그인
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546670-cbb90d9f-48aa-4314-afe6-416e5ecb2c75.png">
      </td>
      <td align="center">
          <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546648-cc5bb318-8140-42f6-9b6e-a89846432c57.png">
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        모달페이지
      </th>
      <th>
        로딩페이지
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546674-a3361803-8c5d-4f0c-9a17-221d7bb3fc1d.jpg">
      </td>
      <td align="center">
          <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546671-c30e9cc7-c935-4c2b-9437-86395d88c62c.jpg">
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        리스트페이지
      </th>
      <th>
        예약결제페이지
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546675-8d41aa39-efb4-4730-96ca-98072b710934.png">
      </td>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184546676-34799bdc-3032-49cd-a688-dfa1f13e7ad0.png">
      </td>
    </tr>
  </tbody>
</table>

## 7. 프로젝트 협업 Tool

- GitHub : 각 페이지별 branch 관리.

- Slack : 팀원간의 실시간 소통 창구.

- Trello : 기능 단위로 카드를 생성, Sprint 단위로 진행했는지와 Stand up 미팅 툴로 활용.

- Notion : 회의정리 기록, 오늘의 공유/질문 사항, 현재 진행 사항, blocker 공유, 기능 단위 페이지 셍성 후 공유 및 기록.

<table>
  <thead>
    <tr>
      <th>
        트렐로
      </th>
      <th>
        노션
      </th>
    </tr>
       <tr>
      <th>
        깃허브
      </th>
      <th>
        슬랙
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184545309-14792748-ce97-449d-a619-dc1f60c80590.jpg">      
        </td>
      <td align="center">
        <img width="789" alt=image" src="https://user-images.githubusercontent.com/83544570/184545339-9336d126-243e-4daa-85b1-fb4044844dbd.jpg">      
        </td>
    </tr>
      <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184545347-3833d8a5-a195-49a1-8b1a-d83af5fb4db7.jpg">      
        </td>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/83544570/184545358-21bbb0dc-754b-4b96-b8d3-1acd53719fcb.png">      
        </td>
    </tr>
  </tbody>
</table>

#

## 8. 회고록
- [🐥 노정은님 회고록(1) - 기능 구현에 대한 회고](https://jeongeuni.tistory.com/53)  <br />
- [🐥 노정은님 회고록(2) - 팀 프로젝트에 대한 회고](https://jeongeuni.tistory.com/54)  <br />

#

### Reference

- 이 프로젝트는 제주패스를 참조하여 학습목적으로 만들었습니다.
- 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
