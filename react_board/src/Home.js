import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li><NavLink to="/read" activeClassName="active-link">Bulletin Board</NavLink></li>
          <li><NavLink to="/write" activeClassName="active-link">Write Page</NavLink></li>
        </ul>
      </nav>
      <button className="login-button"><NavLink to="/login" activeClassName="active-link">Login</NavLink></button>
    </div>
  );
}

export default Home;
