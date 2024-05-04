import React, { useCallback, useState, useEffect } from "react";
import axios from 'axios';

export const Apps = () => {
  const API_KEY = "RMLweHeGwN%2B8KPNZCwR2W56r6zhRfTsr%2FFE%2B8arn77y8MBjbWpbJClN2aRsyY3Br9XEojgftBJEBHS2O%2BzysyQ%3D%3D";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [img,setImg]=useState([])
  const [detail,setDetail]=useState([])

  const loadData = useCallback(async () => {
    try {
      const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${API_KEY}&pageNo=1&numOfRows=5&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=12&_type=json`);
      setData(response.data.response.body.items.item);
    } catch (error) {
      console.error("에러", error);
    }
    // setLoading(false);  // 이건 없어도 그만 
  }, []);

  useEffect(() => {
    loadData();
  }, []); // 처음 실행시키기 위해 

  //이미지 조회 실행을 위해 
  useEffect(() => {
    if (data.length > 0) { //받아온 값이 존재할때 실행하기 위한 코드 
      loadImg(data);
      setLoading(false)
      console.log("***")
    }
  }, [data]); // data가 없데이트 되었을때 

  //이미지 조회
  const loadImg = async (data) => {
    const pageHome =[]
    const imgUrls = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${data[i].contentid}&imageYN=Y&subImageYN=Y&_type=json`);

        imgUrls.push(response.data.response.body.items.item[0].originimgurl);

        console.log(2)
      } catch (error) {
        console.error("에러", error);
      }

      try {
        const page=await axios.get(`https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${API_KEY}&contentId=${data[i].contentid}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`);


        pageHome.push(page.data.response.body.items.item[0].overview)

      } catch (error) {
        console.error("디테일", error);
      }
    }
    setImgIndex(0); //이미지 조회 후 인덱스 0으로 초기화
    setImg(imgUrls);//배열로 저장한 이미지 주소 저장
    setDetail(pageHome)
  };

  const imgButton = () => {
    setImgIndex((prevIndex) => (prevIndex + 1) % img.length);

  };

  //상세조회

  return (
    <div>
      <button onClick={imgButton}>이미지</button> 
      <img src={img[imgIndex]} alt="이미지" />
      <span>{detail[imgIndex]}</span>

      {loading?<p>로딩중</p>:
      <p>{data[imgIndex].title}</p>}

    </div>

  );
};