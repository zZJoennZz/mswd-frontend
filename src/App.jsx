import * as React from 'react';

//styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//components
import Menu from './components/Menu';
import Footer from './components/Footer';

//pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Admin from './pages/Admin';

//other
import { Routes, Route } from 'react-router-dom'

const App = () => {
  // let pages = [   
  //     {
  //         "url": "/",
  //         "content": Home,
  //         "text": "Home"
  //     },
  //     {
  //         "url": "/about",
  //         "content": "About page",
  //         "text": "About"
  //     }
  // ];
  
  return (
    <div className="App">
      
      <Routes>
        <Route exact path="/" element={
          <><Menu /><Home /><Footer /></>
        } />
        <Route exact path="/services" element={<><Menu /><Services /><Footer /></>} />
        <Route exact path="/about" element={<><Menu /><About /><Footer /></>} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
