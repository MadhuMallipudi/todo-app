import './App.css';
import Home from "./components/Home";
import Posts from "./components/Posts";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/posts" element={<Posts/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;