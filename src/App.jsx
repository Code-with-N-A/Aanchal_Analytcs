// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Nave from "./Nave";
import About from "./About";
import Home from "./home";
import Contact from "./Contact";
import SocialLinks from "./Sosalm";
import Footer from "./Footer";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./YouserAcoount";
import SubmitForm from "./Submit";
import Dashboard from "./DashboardD";
import SeeHowItWorks from "./SeeHowItWorks";
import SignupNotification from "./Snotificetion";
import Projects from "./Project";

function App() {
  return (
    <>
      <Nave />
      <SocialLinks />
      <SignupNotification/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
              <About />
          }
        />
        <Route
          path="/Project"
          element={
             <Projects/>
          }
        />
        <Route
          path="/contact"
          element={
              <Contact />
          }
        />
        <Route
          path="/Dashborad"
          element={
             <Dashboard/>
          }
        />
        <Route
          path="/SeeHowItWorks"
          element={
             <SeeHowItWorks/>
          }
        />
        <Route
          path="/@-aanchal-930298*2"
          element={
            <ProtectedRoute>
            <SubmitForm/>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-account" element={<LandingPage />} />

        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
