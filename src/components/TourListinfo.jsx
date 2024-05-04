import React from 'react';
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserTourDetail } from '../hoock/UserTourDetail';
import { Header } from "./Header";
import { Foot } from "./Foot";

export const TourListinfo = () => {
    //투어 여행지 상세로 보여주는 컴포넌트
    const location = useLocation();
    const id = location.state?.id;
    const img = location.state?.img;
    const img2 = location.state?.img2;
    const img3 = location.state?.img3;
    const img4 = location.state?.img4;
    const title = location.state?.title;
    const overview = location.state?.overview;
    const { suname, suview } = UserTourDetail(id);

    return (
        <div>
            <Header />
            <div style={{ height: '50px' }}></div>

            <div class="space-medium">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="post-block">
                                <div class="post-img">
                                    <img src={img} alt="Tour and Travel Agency - Responsive Website Template" class="img-responsive" style={{ width: '1300px', height: '500px' }} />
                                </div>
                                <h1>{title}</h1>
                                <p>{overview}</p>
                            </div>
                        </div>

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p class="blockquote text-center"><h3>"첫번째 여행지"</h3> <p>{suname[0]} </p> </p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={img2} alt="" style={{ maxHeight: '466px' }} />
                            </div>
                            <div style={{ height: '1px', marginBottom: '10px' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h2>{suname[0]}</h2>
                            </div>
                            <p>{suview[0]}</p>
                        </div>
                        <div style={{ height: '5px', marginBottom: '10px' }}></div>

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p class="blockquote text-center"><h3>"두번째 여행지"</h3> <p>{suname[1]} </p> </p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={img3} alt="" style={{ maxHeight: '466px' }} />
                            </div>
                            <div style={{ height: '1px', marginBottom: '10px' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h2>{suname[1]}</h2>
                            </div>
                            <p>{suview[1]}</p>
                        </div>
                        <div style={{ height: '1px', marginBottom: '10px' }}></div>

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p class="blockquote text-center"><h3>"세번째 여행지"</h3> <p>{suname[2]} </p> </p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={img4} alt="" style={{ maxHeight: '466px' }} />
                            </div>
                            <div style={{ height: '1px', marginBottom: '10px' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h2>{suname[2]}</h2>
                            </div>
                            <p>{suview[2]}</p>
                        </div>

                    </div>
                    <div style={{ height: '100px', marginBottom: '10px' }}></div>
                </div>
            </div>
            <Foot />
        </div>
    );
};
