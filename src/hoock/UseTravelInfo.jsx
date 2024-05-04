import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config";
import { useState, useEffect } from "react";

export const UseTravelInfo = () => {
    //투어정보 db로 부터 받아오는 함수
    const [info, setInfo] = useState([]);

    const list = async () => {
        console.log("여행정보 받는 중");
        const data = [];
        try {
            const querySnapshot = await getDocs(query(collection(db, "TourList")));
            querySnapshot.forEach((doc) => {
                data.push(doc.data()); // 수정: doc.data()를 사용하여 문서 데이터 가져오기
                console.log("여행정보", data);
            });
            setInfo(data);
        } catch (error) {
            console.error("여행정보 리스트 오류 발생", error);
        }
    };

    useEffect(() => {
        list();
    }, []);

    return { info };
};
