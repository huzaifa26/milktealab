import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FutureDashboard from "./Pages/Dashboard/FutureDashboard";
import ManagerDashboard from "./Pages/Dashboard/ManagerDashboard";
import Setting from "./Pages/Setting/Setting";
import Application from "./Pages/Application/Application";
import Training from "./Pages/Training/Training";
import Material from "./Pages/Material.js/Material";
import Exam from "./Pages/Exam/Exam";
import Announcement from "./Pages/Announcement/Announcement";

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
        <Route path="/application" element={<Application></Application>}></Route>

          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}></Route>
          <Route path="/futuredashboard" element={<Layout><FutureDashboard /></Layout>}></Route>
          <Route path="/managerdashboard" element={<Layout><ManagerDashboard /></Layout>}></Route>
          <Route path="/setting" element={<Layout><Setting /></Layout>}></Route>
          <Route path="/training" element={<Layout><Training /></Layout>}></Route>
          <Route path="/download-material" element={<Layout><Material /></Layout>}></Route>
          <Route path="/exam" element={<Layout><Exam /></Layout>}></Route>
          <Route path="/announcement" element={<Layout><Announcement /></Layout>}></Route>

            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


