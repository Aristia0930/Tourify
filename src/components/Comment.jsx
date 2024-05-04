export const Comment =(props)=>{
    //댓글내용 나타낸느 컴포넌트
    const delButton=()=>{
        if(props.userDate.uid==props.id){
        props.commentDelete(props.number)}
        else{
            alert("삭제할수 없습니다")
        }
    }


    return(
    <>
                            <li>
                            <div class="comment-info">
                                <h4 class="user-title">{props.name}</h4>
                                

                                <div class="comment-content">
                                    <idv className="row">
                                        <div className="col-11">
                                        <p>{props.text}</p>
                                        </div>
                                        <div className="col-1">
                                        <div  className="text-end">
                                    {props.userDate&&props.userDate.uid==props.id&&
                                    <button  className="btn-close"  onClick={delButton}></button>
                                    }
                                    </div></div>
                                    
                                    </idv>
                                         
                                </div>

                            </div>
                        </li>
                        </>)
}