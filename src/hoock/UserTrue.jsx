import { useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';

export const UserTrue = () => {
  //현재 사용자 상태와 사용자 정보를 받아오는 함수
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDate, setUserDate] = useState();
  const auth = getAuth(); // getAuth 함수를 사용하여 auth 객체를 가져옵니다.
    const setauth=()=>{
                // 사용자의 인증 상태 확인
             onAuthStateChanged(auth, (user) => {
                    if (user) {
                      console.log("사용자가 로그인되어 있습니다:", user);
                      setUserDate(auth.currentUser)
                      setIsUserLoggedIn(true);
                    } else {
                      console.log("사용자가 로그아웃되었습니다.");
                      setIsUserLoggedIn(false);
                      setUserDate(null)
                    }
                  })

    }

    const setSessionPersistenceAndCheckUserAuth = async () => {
        try {
          // 세션 유지 설정
            await setPersistence(auth, browserSessionPersistence);
            setauth();
  ;
        } catch (error) {
          console.error("오류 처리:", error);
        }
      };
  useEffect(() => {


    // useEffect 내부에서 직접 호출해야 합니다.
    setSessionPersistenceAndCheckUserAuth();
  }, [auth]); // auth 객체가 변경될 때마다 useEffect가 실행되도록 dependencies에 추가합니다.

  return {isUserLoggedIn,userDate};
};
