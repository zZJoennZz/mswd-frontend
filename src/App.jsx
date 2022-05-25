import * as React from "react";

//styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//components
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import RunningDateTime from "./components/RunningDateTime";

//pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import FAQ from "./pages/FAQ";
import DownloadableForms from "./pages/DownloadableForms";
import ContactUs from "./pages/ContactUs";
import AnnouncementSingle from "./pages/AnnouncementSingle";
import Track from "./pages/Track";
import EServices from "./pages/EServices";

//other
import { Routes, Route } from "react-router-dom";
import { Row, Container } from "react-bootstrap";

import AdminSoloParentForPrint from "./components/AdminSoloParentForPrint";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Menu />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/services"
          element={
            <>
              <Menu />
              <RunningDT />
              <Services />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/eservices"
          element={
            <>
              <Menu />
              <RunningDT />
              <EServices />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/announcement/:annId"
          element={
            <>
              <Menu />
              <RunningDT />
              <AnnouncementSingle />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/about"
          element={
            <>
              <Menu />
              <RunningDT />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/contact-us"
          element={
            <>
              <Menu />
              <RunningDT />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/apply/:serviceId"
          element={
            <>
              <Menu />
              <RunningDT />
              <Apply />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/faq"
          element={
            <>
              <Menu />
              <RunningDT />
              <FAQ />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/download-forms"
          element={
            <>
              <Menu />
              <RunningDT />
              <DownloadableForms />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/track/:trackId"
          element={
            <>
              <Menu />
              <RunningDT />
              <Track />
              <Footer />
            </>
          }
        />
        <Route exact path="/admin/*" element={<Admin />} />
        <Route exact path="/asdasd" element={<AdminSoloParentForPrint />} />
      </Routes>
    </div>
  );
};

const RunningDT = () => {
  return (
    <Container>
      <Row className="pt-3 pb-3 text-end">
        <RunningDateTime />
      </Row>
    </Container>
  );
};
export default App;
