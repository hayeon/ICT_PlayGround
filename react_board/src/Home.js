//영서님 코드
import { NavLink, Route, Routes } from "react-router-dom";
import Read from "./Read";
import Write from "./Write";
import Sidebar from "./Sidebar";
import "./Home.css";
import backgroundImage from "./img/cat.jpg";

function Home() { 
  //배경 설정
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "100vh"
  };

  return (
    <div className="home" style={backgroundStyle}>
      <h1>Main Page</h1>
      {/* 사이드바 */}
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <Routes>
          <Route exact path="/read" component={Read} />
          <Route exact path="/write" component={Write} />
        </Routes>
      </div>
      <nav>
        <ul>
          { /*다른 페이지로 연결 */ }
          <li>
            <NavLink to="/read" activeClassName="active-link">
              게시판 조회
            </NavLink>
          </li>
          <li>
            <NavLink to="/write" activeClassName="active-link">
              게시판 글쓰기
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* 검색 버튼 */}
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      {/* 로그인 버튼 */}
      <button className="login-button">
        <NavLink to="/login" activeClassName="active-link">
          Login
        </NavLink>
      </button>
    </div>
  );
}

export default Home;