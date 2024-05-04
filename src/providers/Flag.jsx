import { createContext,useState } from "react";
import{Usertour} from'../hoock/Usertour'

export const AdminFlagContext = createContext({});

//사용법
    //플래그 만들기

export const Flag =(props) => {

    const {children}=props
    const [user, setUser] = useState(false) //로그인 여부
    const [userDate, setUserDate] = useState() // 현재 유저 정보
    const[lsit,setList]=useState([])  //게시판 목록
    

    const[data1,setData1]=useState()
    const[img1,setimg1]=useState()
    const[detail1,setdetail1]=useState()
    const [tourid,settourid]=useState([])




    //AdminFlagContext 안에 provider 이 있으으로 감싸면 된다
    return (
        <AdminFlagContext.Provider value={{tourid,settourid,user, setUser,userDate, setUserDate,lsit,setList,detail1,img1,data1,setData1,setimg1,setdetail1}}>
            {children}
        </AdminFlagContext.Provider>
    )
}