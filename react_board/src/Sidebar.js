import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
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
    </div>
  );
}

export default Sidebar;
