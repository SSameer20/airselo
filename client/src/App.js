import {Routes, Route } from "react-router-dom";
import './App.css';
import Menu from './components/Menu';
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/menu" element={<Menu />}/>
        </Routes>


      </div>
    
  );
}

export default App;
