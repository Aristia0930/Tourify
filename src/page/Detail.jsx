import { Header } from '../components/Header';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Foot} from "../components/Foot.jsx"
import {CommentWrite} from"../components/CommentWrite.jsx"
import {CommentList} from"../components/CommentList.jsx"
import { UserTrue } from '../hoock/UserTrue';
import React, {useEffect, useState, } from "react";
export const Detail=(props)=>{
  //추천관광지 상세페이지

  const {isUserLoggedIn,userDate} = UserTrue();
  const [checkComment,setCheckComment]=useState(false)
  const [udate,setUdate]=useState("")





  useEffect(()=>{
    setUdate(userDate)
    console.log("현재 여행지 아이디",props.docid)

  },[userDate])

    return(


    <div>
      <Header />
      <div style={{ height: '50px' }}></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2" style={{ width: '80%' }}>
            <div className="card" >
              <div className="card-header">관광지</div>
              <div className="card-body">
                <h1 className="card-title">{props.title}</h1>
                <div className="post-content" style={{ backgroundColor: '#f0f0f0', minHeight: '200px', padding: '15px' }}>

                    <img 
                      src={props.url} 
                      alt="게시글 이미지" 
                      className="img-fluid mb-3" 
                      style={{ maxWidth: '100%', maxHeight: '500px' }} 
                    />

                  <p className="card-text" >{props.text}</p>
                </div>
             <CommentList doic={props.docid} checkComment={checkComment} setCheckComment={setCheckComment} userDate={udate}/>
                <CommentWrite doic={props.docid} userDate={udate} setCheckComment={setCheckComment} isUserLoggedIn={isUserLoggedIn}/>
                
                <div className="row">
                  <div className="col text-end"   style={{ padding: '15px' }}>
                    
                    <Link to="/" style={{ textDecoration: 'none' }}><Button variant="primary" className="me-2">목록</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '50px' }}></div>
      <Foot></Foot>
    </div>


    )
}