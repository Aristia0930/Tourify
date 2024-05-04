import axios from 'axios';
import { useCallback, useState, useEffect,useMemo } from "react";

export const UserTourDetail = (id) => {
    //투터여행 컨텐츠아이디 받아와 검색하여 상세 정보 꺼내오는 함수
    const API_KEY = "m/Tz33z1JeXRei7sOhXX8ELl5CTcDP3%2Bwo91Qhlc%2Bgv6FopZoz4q4dKHHj23OHw7rUWvRVI9Xs73emJ1k42lnw%3D%3D";
    //hbzfERsotplkfLTBu9J1Jv7trcLjtmbBFjJn3%2BUS9%2BUemRijdoUKIvRjTEtfJJ9GSlPYHcjC2DrXDPc4AtKScA%3D%3D
   
    // const [sudata, setSudata] = useState([]);
    const [suname, setSuname] = useState([]);
    const [suview, setSuview] = useState([]);


    const loadData = useCallback(async () => {
        
        try {  
            // const data=[]
            const name=[]
            const view=[]

        
            

            const response = await axios.get(`https://apis.data.go.kr/B551011/KorService1/detailInfo1?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=25&numOfRows=10&pageNo=1`)
            for (let i=0;i<3;i++){
            const newData = response.data.response.body.items.item[i];
            name.push(newData.subname)
            view.push(newData.subdetailoverview)

            }


      

            setSuname(name)
            setSuview(view)
     

    
            
        } catch (error) {
            console.error("에러", error);

            
        }
    }, []);

    useEffect( () => {

        loadData();
        console.log("투어 상세정보 로딩중")
    }, []); // 페이지가 처음 로드될 때 한 번만 호출

    return {suname,suview};
};
