import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "./firebase-config";

export const CommentWrite =(props) => {
    //댓글작성 컴포넌틋
    const [test,setTest]=useState("")
    //text값 저장하는 함수
    const changeTest=(e)=>{
        const value = e.target.value;
        console.log(value); 
        setTest(value); 
    }

    //db로 데이터 보내기 
    //0 : 유저아이디 1: 내용 2 닉네임
    const writeDB=async () =>{
        //현재 컨텐츠아이디의 문서가 존재하는지 부터 확인한다.

        try{
            if(!props.isUserLoggedIn){
                alert("로그인해주세요")

            }else{
            const writecomment=await getDoc(doc(db,"comment",`${props.doic}`))
            if(writecomment.exists()){
                //문서가존재한다면
                const writd=Object.keys(writecomment.data()).length
                let data=writecomment.data()
                data[writd]=[props.userDate.uid,test,props.userDate.displayName,0]
                
                // data={...writecomment.data(),[writd]:[props.userDate.uid,test,props.userDate.displayName]}
                console.log(data)
                await setDoc(doc(db,"comment",`${props.doic}`),data)
                props.setCheckComment(true)
            }
            else{
                //문서가 존재하지 않는다면
                const data={
                    0:[props.userDate.uid,test,props.userDate.displayName,0]
                }
                await setDoc(doc(db,"comment",`${props.doic}`),data)
                props.setCheckComment(true)
            }}
            setTest("")


        }catch(error){
            console.log(error,"댓글작성 실패")
        }
    }



//유저아이디 받아야하고 컨텐츠 아이디가 있는경우 컨텐츠 아이디 받고 게시글인경우 게시글 인경우 문서명으로 해서 데이터베이스에 댓글작성
    
    return(
        <div class="leave-comments">
        <form>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label class="control-label" for="textarea">Comments</label>
                        <textarea class="form-control" id="textarea" name="textarea" rows="6" onChange={changeTest} value={test}></textarea>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <div class="orm-fgroup">
                        <button class="btn btn-primary btn-sm" onClick={(e)=>{e.preventDefault();writeDB();}}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )

}