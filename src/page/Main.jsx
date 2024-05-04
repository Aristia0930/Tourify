import React, { useCallback, useState, useEffect } from "react";
import { Header } from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Post } from "../components/Post";
import { AdminFlagContext } from "../providers/Flag";
import { useContext } from "react";
import axios from 'axios';
import {EventListView} from "../components/EventListView"
import { TourList } from "../components/TourList"
import {UseTravelInfo} from "../hoock/UseTravelInfo.jsx"
import {Foot} from "../components/Foot.jsx"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Main = () => {
  //메인페이지
  const { detail1, img1, data1 } = useContext(AdminFlagContext);
  const {info} =UseTravelInfo()
  const [listd,setListd]=useState([])

  // const {data,img,detail} = Usertour()
  //행사정보 조회
  const loadlist=useCallback(async ()=>{
    const API_KEY = "m/Tz33z1JeXRei7sOhXX8ELl5CTcDP3%2Bwo91Qhlc%2Bgv6FopZoz4q4dKHHj23OHw7rUWvRVI9Xs73emJ1k42lnw%3D%3D";
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date= `${year}${month}${day}`;
    try{
      const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&listYN=Y&eventStartDate=${date}&_type=json`)
      console.log("행상정보",response.data.response.body.items.item)
      setListd(response.data.response.body.items.item)
    }catch(error){
      console.error("행사정보에러",error)
    }

  })
  useEffect(()=>{
    loadlist()

  },[])





  //상세조회
  return (
    <div>
           <Header />
           <div style={{ height: '50px' }}></div>
           <div className="bg-default space-medium">
    <div className="container">
        {listd.length > 0 && (
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <EventListView data={listd[0]} />
                    </div>
                    {listd.slice(1).map((array, index) => (
                        <div className="carousel-item" key={index}>
                            <EventListView key={index} data={array} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )}
    </div>
</div>
  
      <div className="space-medium">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="section-title text-center">
                <h1>여행지 추천</h1>
              </div>
            </div>
          </div>

          <div className="row">
            


          {img1 && detail1 && data1.flat().map((post, index) => (<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Post key={index} imageUrl={img1[index]} title={post.title} number={index} /> </div>
          ))}

           
          </div>

        </div>
      </div>
  
      <div className="bg-default space-medium">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="section-title text-center">
                <h1>아름다운 대한 민국 전국 팔도 여행</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="space-medium">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="section-title text-center">
                <h1>관광지 투어</h1>
              </div>
            </div>
          </div>
          <div className="row">
        <div className="space-medium">
          <div className="container">
            <div className="row">
              {info.length > 0 && info.flat().map((array, index) => (
                <TourList key={index} tourinfo={array} num={index} />
              ))}
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
  
 <Foot />
  
 

  
  
    </div>
  );
}