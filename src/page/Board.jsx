import { Header } from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostList } from "../components/PostList";
import {  useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, orderBy, query,doc} from "firebase/firestore";
import { db } from "./firebase-config"
import {Foot} from "../components/Foot.jsx"




export const Board = ({reloadBoard}) => {
    //게시판 목록 페이지

    const [page,setPage]=useState([])
    const [dtas,setDatas]=useState([])
    const [num,setNum]=useState(0)

    const [doic,setdoic]=useState([])
    
    

    

    //페이지 내용 저장 처음 한번 자동으로 실행하기 그 후부터는 버튼 누른후 번호로 실행하기
    const pagelist = async () => {
        const data=[];
        const id=[]

        let n=0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "newtext"), orderBy("now", "desc")));
            querySnapshot.forEach((doc) => {
                data.push(doc);
                id.push(doc.id)
                
     
  
                n++
                
 
            });
            setDatas(data) 
            reloadBoard(data);
            setdoic(id)
    
  
            setPage(Array.from({ length: Math.ceil(n / 10) }, (_, index) => index+1));


        } catch (error) {
            console.error("문서를 가져오는 중 오류 발생:", error);
        }
    } // 빈 배열을 전달하여 함수가 최초 한 번만 생성되도록 함
    useEffect(()=>{
        pagelist();


    },[])



    const onCLikcbutton=(e)=>{
        setNum(e.target.value)
        console.log(e.target.value)

    }

    const delebutton=async (docid)=>{
        await deleteDoc(doc(db,"newtext",docid))
        pagelist();

    }
    
    return (
        <div>

            <Header />



            <div className="" >

            <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="section-title text-center ">
                <h1 className="bordem">게시판</h1>
              </div>
            </div>
          </div>
          <div className="container ">
            <table class="table table-bordered" >
                <thead className="table-dark">
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">게시자</th>
                        <th scope="col">제목</th>
                        <th scope="col">#</th>

                    </tr>
                </thead>
                
                <tbody className="table-group-divider">
                {dtas.slice(Number(num), Number(num)+10).map((list, index) => (
  <PostList key={index} kjy={Number(num)+Number(index)+1} title={list.data().title} name={list.data().name} delebutton={delebutton} id={list.id} doic={doic[Number(num)+Number(index)]}/>
))}


              
            </tbody>
            </table>

                {page.map((number)=>(
                       <button className="btn btns" onClick={onCLikcbutton} value={(number-1)*10}>{number}</button>

                    ))}<div style={{ height: '20px' }}></div>  </div> </div>
      <Foot></Foot>
        </div>
    )
}
