import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export const PostList=({title,name,kjy,delebutton,id,doic})=>{
    //게시판 게시글 목록을 나타내는 컴포넌트
    

    const onclick=()=>{
        const confirmDelete = window.confirm("문서를 삭제하시겠습니까?");
        if(confirmDelete){
        delebutton(id);}
        
    }


    return(
                    
                    <tr>
                        <th scope="row">{kjy}</th>
                        <td><Link to={`/${kjy}`} state= {{ doic:doic }}>{name}</Link></td>
                        <td>{title}</td>
                        <td></td>
                        {/* <td><button onClick={onclick}>삭제</button></td> */}
                        {/*후에 관리자 기능 추가하면 버튼 추가하기*/}

                    </tr>

    )
}