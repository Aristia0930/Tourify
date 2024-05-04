import { Route, Routes } from 'react-router-dom';
import {Main} from './page/Main';
import {Login} from './page/Login';
import {Write} from './page/Write';
import {Board} from './page/Board';
import {PostDetail} from './page/PostDetail';
import{Usertour} from'./hoock/Usertour'
import {Detail} from './page/Detail'
import { AdminFlagContext } from "./providers/Flag";
import { useContext } from "react";
import { TourListinfo } from './components/TourListinfo';


import { useState } from 'react';
// 관광지 투어 예약하기 TourList 에 작성하기 
// 이부분은 미리 정보를 받아서 db 넣고 받아오는 형식으로 처리해야 좋을것 같음 유저훅으로 처리하자
// 반복정보 조회 에서 contentld 아이디 넣어서 내용물조회 내용물 상세조회 가능하다 .
// 관광정보 동기화 목록 조회 에서 coontentld 값 가져오기
// 행사정보 조회 하기 값보기 
//훗날 이 관광지 투어 정보 서비스는 관리자모드로 수정할수 있도록하자.

export const App=()=>{

  const {detail1,img1,data1,setData1,setimg1,setdetail1,tourid,settourid}=useContext(AdminFlagContext)
  const {data,img,detail,check,docid} = Usertour()


  if(img && detail &&data&&docid){
    console.log("플래그 저장")
    setData1(data)
    setimg1(img)
    setdetail1(detail)
    settourid(docid)
    console.log("여행지아이디",docid)

  }



  const [datam,setDatam]=useState([])
  if (!check){
    console.log("초기화")
    localStorage.clear()
  }


  const reloadBoard = (value) => {
    console.log("재랜더링")
    setDatam(value)



  };

  


    return(
        <div >
        <Routes >
        <Route path="/" element={<Main  />} /> {/* 키(props) 변경 */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/T1" element={<TourListinfo />} />
        <Route path="/T2" element={<TourListinfo />} />
        <Route path="/T3" element={<TourListinfo />} />
        <Route path="/Board" element={<Board reloadBoard={reloadBoard}/>} />
        {datam.map((array,index) => (
  <Route  path={`${index+1}`} element={<PostDetail url={array.data().img} name={array.data().name} title={array.data().title} text={array.data().text}   docid={array.id} uid={array.data().userid}/>}/>
))}

{img && detail &&tourid&&data.map((array,index) => (
  <Route  path={`p${index}`} element={<Detail url={img[index]} title={array.title} text={detail[index]} docid={tourid[index]} />}/>
))}

      </Routes >

        </div>
    )
}