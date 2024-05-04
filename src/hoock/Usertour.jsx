import axios from 'axios';
import { useCallback, useState, useEffect,useMemo } from "react";

export const Usertour = () => {
    //관광지 추천하는 정보 랜덤으로 받아오는 함수
    const API_KEY = "m/Tz33z1JeXRei7sOhXX8ELl5CTcDP3%2Bwo91Qhlc%2Bgv6FopZoz4q4dKHHj23OHw7rUWvRVI9Xs73emJ1k42lnw%3D%3D";
    //hbzfERsotplkfLTBu9J1Jv7trcLjtmbBFjJn3%2BUS9%2BUemRijdoUKIvRjTEtfJJ9GSlPYHcjC2DrXDPc4AtKScA%3D%3D
    const [data, setData] = useState([]);
    const [img, setImg] = useState([]);
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [check, setcheck] = useState(false);
    const [docid,setDocic]=useState([])

    const loadData = useCallback(async () => {
        
        try {
 

            const storedData = localStorage.getItem('userData');
                    const storedData1 = localStorage.getItem('userImg');
        const storedData2 = localStorage.getItem('userDetail');
        const storedid2 = localStorage.getItem('userid');

            

            if (storedData) {
                setData(JSON.parse(storedData));
                setDetail(JSON.parse(storedData2));
                setImg(JSON.parse(storedData1));
                setDocic(JSON.parse(storedid2))
                
                setLoading(false);
                setcheck(true)
            
            } else {
            
               const da=data
               const imgUrls = img
               const pageHome =detail
               const id=docid
               let count=0;
               while (count < 6 && da.length<=6) {
                const randomNumber = Math.floor(Math.random() * 4200);
                const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${API_KEY}&pageNo=${randomNumber}&numOfRows=1&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=12&_type=json`);
                console.log("데이터로딩")
                const newData = response.data.response.body.items.item[0];
                


                if (newData) {
                    console.log("이미지로딩진입")
                    const contentId = newData.contentid;

                    const response2 = await axios.get(`http://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&imageYN=Y&subImageYN=Y&_type=json`);
                    console.log(response2)
                    const item = response2.data.response.body.items.item;                    
                    const page = await axios.get(`https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${API_KEY}&contentId=${contentId}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`);
                    const overview = page.data.response.body.items.item[0].overview;

                    if (item) {

                        imgUrls.push(item[0].originimgurl);
                        da.push(newData);
                        pageHome.push(overview);
                        id.push(contentId+'tour')
                        console.log("id저장",id)
                        count++;
                    } else {
                        console.log(`contentid ${contentId}에 대한 이미지가 없습니다.`);
                    }
                }
            }  

                setData(da);
                localStorage.setItem('userData', JSON.stringify(da)); // 로컬 스토리지에 데이터 저장
                setLoading(true);
                setcheck(true)
                setDetail(pageHome);
                setDocic(id)

       
                // 상세 정보 저장
                localStorage.setItem('userDetail', JSON.stringify(pageHome));
                localStorage.setItem('userid', JSON.stringify(id));
                
        setImg(imgUrls);


       
        // 이미지 URL 저장
        localStorage.setItem('userImg', JSON.stringify(imgUrls));

    
            
        }} catch (error) {
            console.error("에러", error);

            
        }
    }, []);

    useEffect( () => {

        loadData();
        console.log("로딩중")
    }, []); // 페이지가 처음 로드될 때 한 번만 호출
    useEffect( () => {
        

        const storedData1 = localStorage.getItem('userImg');
const storedData2 = localStorage.getItem('userDetail');
const storedid2 = localStorage.getItem('userid');

setDetail(JSON.parse(storedData2));
setImg(JSON.parse(storedData1));
setDocic(JSON.parse(storedid2))


    }, [data]);

return { data, img, detail, loading, check,docid }
};


