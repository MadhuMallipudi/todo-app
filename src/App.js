import './App.css';
import Home from "./components/Home";
import Todos from "./components/todos/Todos";
import Posts from "./components/posts/Posts";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/posts" element={<Posts/>} />
            <Route exact path="/todos" element={<Todos/>} />

          </Routes>
      </Router>
    </div>
  );
}

export default App;
