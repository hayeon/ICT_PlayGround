// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import Read from './Read';
// import Write from './Write';
// import Login from './Login';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route exact path="/" component={Home} />
//           <Route path="/login" component={Login} />
//           <Route path="/write" component={Write} />
//           <Route path="/read" component={Read} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { Outlet } from "react-router-dom";
import Home from "./Home";

function Root() {
  

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Root;