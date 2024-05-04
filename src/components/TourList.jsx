
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { useEffect } from 'react';
import { TourListinfo } from './TourListinfo'
import { Link } from 'react-router-dom';
export const TourList=({tourinfo,num})=>{
    //투어 목록을 나타내는 컴포넌트
        useEffect(()=>{
            console.log("이미지정보",tourinfo.img)
        },[])

    return(
    
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="tour-block">
                        <div class="tour-img">
                            <img src={tourinfo.img} alt="Tour and Travel Agency - Responsive Website Template"   />
                        </div>
                        <div class="tour-content">
                            <h2>{tourinfo.title}</h2>
                            <div class="tour-meta"> <span class="tour-meta-icon"><i class="fa fa-sun-o"></i></span><span class="tour-meta-text">{tourinfo.addr1}</span> </div>

                            <div class="tour-details">
                                <div class="tour-details-text"><span>{tourinfo.day} </span></div>
                                <div class="tour-details-btn"> <span>  <Link to={`/T${num+1}`} state= {{ id: tourinfo.contentid,img:tourinfo.img,img2:tourinfo.img2,img3:tourinfo.img3,img4:tourinfo.img4, title:tourinfo.title ,overview:tourinfo.overview}} class="btn btn-primary">View Details</Link></span> </div>
                            </div>
                        </div>
                    </div>
                </div>

    )
}
