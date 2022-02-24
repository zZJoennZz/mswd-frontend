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
import DownloadableForms from './pages/DownloadableForms';
import ContactUs from './pages/ContactUs';
import AnnouncementSingle from './pages/AnnouncementSingle';

//other
import { Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
    
        <Routes>
          <Route exact path="/" element={
            <><Menu /><Home /><Footer /></>
          } />
          <Route exact path="/services" element={<><Menu /><Services /><Footer /></>} />
          <Route exact path="/announcement/:annId" element={<><Menu /><AnnouncementSingle /><Footer /></>} />
          <Route exact path="/about" element={<><Menu /><About /><Footer /></>} />
          <Route exact path="/contact-us" element={<><Menu /><ContactUs /><Footer /></>} />
          <Route exact path="/apply/:serviceId" element={<><Menu /><Apply /><Footer /></>} />
          <Route exact path="/faq" element={<><Menu /><FAQ /><Footer /></>} />
          <Route exact path="/download-forms" element={<><Menu /><DownloadableForms /><Footer /></>} />
          <Route exact path="/admin/*" element={<Admin />} />
        </Routes>

    </div>
  );
}

export default App;
