import { useEffect, useState } from "react"
import {Comment} from "./Comment"
import {  doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase-config"
export const CommentList =(props)=>{
    //댓글목록 컴포넌트
    const [comdata,setComdata] =useState([])
    

    const commlist= async ()=>{
        const comment=[]
        try{
            let data={}
            let count=0
            console.log("댓글여행이지 아이디",props.doic)
            const result=await getDoc(doc(db,"comment",`${props.doic}`))
            if(result.exists()){
            console.log("Document data:", result.data());
            for (let i in result.data()){
                console.log("댓글재샌성",i)
                if (result.data()[i][3]=='0'){
                    data[count]=[result.data()[i][0],result.data()[i][1],result.data()[i][2],result.data()[i][3]] 
                    count++
                }
            }

            setComdata(data)}
            


        }catch(error){
            console.log(error,"댓글로딩 실패")
        }
    }

    useEffect(() => {
        commlist();
    }, []);

    useEffect(() => {
        commlist();
        props.setCheckComment(false)
        console.log("댓글재로딩중")
    }, [props.checkComment]);
    



    const commentDelete=async(num)=>{
        let commentdata=comdata
        for(let i in comdata){
            if(i==num){
                commentdata[i][3]=1
            }
        }

        await setDoc(doc(db,"comment",`${props.doic}`),commentdata)
        commlist()
        

    }

    return(
        <div class="comment-area">
        <div class="row">
            <div class=" col-lg-12 col-md-12">
                <div class="comment-title">
                    <h2>Comments</h2>
                    <ul class="comment-list">
                        {Object.keys(comdata).length>0&&Object.keys(comdata).map((array,index)=>(
                        <Comment key={index} id={comdata[index][0]} text={comdata[index][1] } name={comdata[index][2]} userDate={props.userDate} number={index} commentDelete={commentDelete}/> ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}