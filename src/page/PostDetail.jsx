
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteDoc,doc} from "firebase/firestore";
import { db } from "./firebase-config"
import { UserTrue } from '../hoock/UserTrue';
import {Foot} from "../components/Foot.jsx"
import {CommentWrite} from"../components/CommentWrite.jsx"
import {CommentList} from"../components/CommentList.jsx"
import { useLocation } from "react-router-dom";
export const PostDetail = (props) => {
  //게시판 상세내용 표시 페이지

  const [imgurl, setImgurl] = useState("");
  const {isUserLoggedIn,userDate} = UserTrue();
  const [users,setUser]=useState(false)
  const location = useLocation();
  const doic = location.state?.doic;
  const [checkComment,setCheckComment]=useState(false)


  const uset= async () => {
    console.log(isUserLoggedIn)
    if(isUserLoggedIn){
    try {
      console.log(userDate.uid)
      console.log(props.uid)
      if (userDate.uid==props.uid){
      setUser(true)}
    }catch (error) {
      console.error("작성실패", error);
  }}
  }
  useEffect(() => {
    if (props.url) {
      const storage = getStorage();
      const pathReference = ref(storage, `${props.url}`);
      getDownloadURL(pathReference)
        .then((url) => {
          setImgurl(url);
        })
        .catch((error) => {
          console.error('파일로드에로:', error);
          // 이미지 로드 실패 시 처리할 내용 추가 가능
        });
    }

  }, []);

  const delebutton=async ()=>{
    await deleteDoc(doc(db,"newtext",props.docid))
    console.log("삭제")

  }

  useEffect(() => {
    uset();
    
  }, [userDate]);




  return (
    <div>
      <Header />
      <div style={{ height: '50px' }}></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2" style={{ width: '80%' }}>
            <div className="card" >
              <div className="card-header ">게시판</div>
              <div className="card-body">
                <h1 className="card-title">제목: {props.title}</h1>
                <h2 className="card-subtitle mb-2 text-muted">작성자: {props.name}</h2>
                <div className="post-content" style={{ backgroundColor: '#f0f0f0', minHeight: '200px', padding: '15px' }}>
                  {imgurl && (
                    <img 
                      src={imgurl} 
                      alt="게시글 이미지" 
                      className="img-fluid mb-3" 
                      style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                  )}
                  <p className="card-text" >{props.text}</p>
                </div>

                <CommentList doic={doic} checkComment={checkComment} setCheckComment={setCheckComment} userDate={userDate}/>
                <CommentWrite doic={doic} userDate={userDate} setCheckComment={setCheckComment} isUserLoggedIn={isUserLoggedIn}/>

                <div className="row">
                  <div className="col text-end"   style={{ padding: '15px' }}>
                    
                    <Link to="/Board" style={{ textDecoration: 'none' }}><Button variant="primary" className="me-2">목록</Button></Link>
                    {users&&(<Link to="/Board" style={{ textDecoration: 'none' }}><Button className="btn" variant="danger" onClick={delebutton}>삭제</Button></Link>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '80px' }}></div>
      <Foot></Foot>
    </div>
  );
};