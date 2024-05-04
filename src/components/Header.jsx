import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';

import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import { UserTrue } from '../hoock/UserTrue';

export const Header = () => {
  //헤더 컴퍼넌트 및 네비게이션

  const {isUserLoggedIn} = UserTrue();
  
  const loginOut= async ()=>{
        try{
          await signOut(auth)
          console.log("로그아웃")
        }catch(error){
          console.log(error.message)
        }
      }


    return (
        <div>

    
 
 <Navbar bg="body-tertiary" expand="lg">
            <div className="container-fluid">
                <Navbar.Brand href="#"><Link to="/" style={{ textDecoration: 'none' }}>Main</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link ><Link to="/Board" style={{ textDecoration: 'none' }}>게시판</Link></Nav.Link>
                        {/* <Nav.Link href="#">Link</Nav.Link>

                        <Nav.Link href="#" disabled>Link</Nav.Link> */}
                    </Nav>   
                    
     
                    {!isUserLoggedIn? <Link to="/Login" style={{ width: '150px' , textDecoration: 'none' }}>로그인</Link> :               
                    <NavDropdown title="마이페이지" id="navbarScrollingDropdown"style={{ width: '150px' }} >
                            <NavDropdown.Item onClick={loginOut}>로그아웃</NavDropdown.Item>
                            <NavDropdown.Item href="#"><Link to="/Write" style={{ textDecoration: 'none' }}>글쓰기</Link></NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>}
 
                        
               
                </Navbar.Collapse>
            </div>
        </Navbar>
            
        </div>
    );
}
