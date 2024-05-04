import {  doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "./firebase-config"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {  useState } from "react";
import {Header} from "../components/Header";
import {Navigate } from 'react-router-dom'; // Redirect 추가
import {Foot} from "../components/Foot.jsx"


import 'bootstrap/dist/css/bootstrap.min.css';
import { UserTrue } from '../hoock/UserTrue';
export const Write=()=>{
  //작성페이지 작성한 내용물을 db로 보내는 기능 포함


  const {isUserLoggedIn,userDate} = UserTrue();

    const[img,setImg] = useState();
    const[title,setTitle]=useState("");
    const[text,setText]=useState("");
    const[check,setcheck]=useState(false);
    const[sum,setsum]=useState(false);


    const changeimge=(e)=>{
        setImg(e.target.files)
        if(e.target.files)
            setcheck(true)
        else
            setcheck(false)
        console.log(e.target.files[0])
    }
    
    const submitchange=async (a)=>{
        try{
            const storage=getStorage(); //참조만든다
            const storageRef = ref(storage, `${a}/${img[0].name}`); //값을 어디에 넣을지 지정
            console.log(img[0].name)
            await uploadBytes(storageRef,img[0]); //업로드하기 
            console.log("파일 업로드 성공");

        } catch(error){
            console.log("파일업로드 에러")
        }
   
    }


    //저장//유저 정보 확인할 꺼 받아야한다.
    const writeText = async () => {
        console.log(isUserLoggedIn)
        if(isUserLoggedIn){
        try {
            let number = await numberTest();
            console.log(number)
            const data = check ? {
                now:number,
                img: `${number}/${img[0].name}`,
                name: userDate.displayName,
                text: text,
                title: title,
                userid: userDate.uid
            } : {
                now:number,
                img: "",
                name: userDate.displayName,
                text: text,
                title: title,
                userid:userDate.uid
            };
            if(check){
            submitchange(number)}
            await setDoc(doc(db, "newtext", `${number}`), data);
            await setDoc(doc(db, "number", "now"), {number:number+1});
            setsum(true)
            

            
        } catch (error) {
            console.error("작성실패", error);
        }}
        else{
            alert("로그인 해주세요")
        }

        
    };
    if (sum) {
        return <Navigate to="/" replace />
      
        
        
 
    }
    //게시판 번호 가져오기
    const numberTest=async ()=>{

        const docRef=doc(db,"number","now")


        try{
            const path =await getDoc(docRef)
            if(path.exists()){
            return path.data().number}
            else{
                console.log("실패")
            }

         
            
        }catch(error){
            console.log("게시판 번호 에러")
            return 0
        }
    }



    return (
        <div>
          <Header />
          <div style={{ height: '50px' }}></div>
      
          <div className="container">
            <div className="row">
            <form onSubmit={(e) => { e.preventDefault(); writeText(); }}>
                <table className="table table-striped" style={{ textAlign: 'center', border: '1px solid #dddddd' }}>
                  <thead>
                    <tr>
                      <th colSpan="2" style={{ backgroundColor: '#eeeeee', textAlign: 'center' }}>게시판 글쓰기 양식</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="글제목" 
                          value={title} 
                          onChange={(e) => setTitle(e.target.value)} 
                          maxLength="50" 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <textarea 
                          className="form-control" 
                          placeholder="글내용" 
                          value={text} 
                          onChange={(e) => setText(e.target.value)} 
                          maxLength="2408" 
                          style={{ height: '350px' }} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="row">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={changeimge} 
                            className="form-control" 
                            style={{ width: '75%', marginLeft: '15px' }} 
                          />
                          <input 
                            type="submit" 
                            className="btn btn-primary pull-right" 
                            value="글쓰기" 
                            style={{ width: '15%',marginLeft: '4%' }} 
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
          <div style={{ height: '50px' }}></div>
      <Foot></Foot>
        </div>
      );
    }