import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export const Post=({ imageUrl, title ,number}) => {
  //메인에서 추천관광지 보여주는 컴포넌트
    return (
      
      // <div className="col-md-4"><Link  to={`p${number}`} style={{ textDecoration: 'none' }}>
      //   <div className="post">
      //     <img src={imageUrl} alt="게시글 이미지" className="img-fluid" style={{ width:'200px', height: '200px' }} />
      //     <div className="post-title">{title}</div>
      //   </div></Link>
      // </div>

      <Link  to={`p${number}`} style={{ textDecoration: 'none' }}><div className="service-block">
      <div className="service-img">
      <img src={imageUrl} alt="게시글 이미지" style={{ width:'1000px', height: '300px' }}/>
      </div>
      <div className="service-content">
      <h3><div className="title">{title}</div></h3>
      </div>
    </div></Link>
    );
  }


  
