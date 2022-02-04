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
import Apply from './pages/Apply';
import FAQ from './pages/FAQ';

//other
import { Routes, Route } from 'react-router-dom'

const App = () => {
  let [isLoading, setIsLoading] = React.useState(false);
  let [isAuth, setIsAuth] = React.useState(false);
  
  return (
    <div className="App">
      
      <Routes>
        <Route exact path="/" element={
          <><Menu /><Home /><Footer /></>
        } />
        <Route exact path="/services" element={<><Menu /><Services /><Footer /></>} />
        <Route exact path="/about" element={<><Menu /><About /><Footer /></>} />
        <Route exact path="/apply/:serviceId" element={<><Menu /><Apply /><Footer /></>} />
        <Route exact path="/faq" element={<><Menu /><FAQ /><Footer /></>} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
      
    </div>
  );
}

export default App;
