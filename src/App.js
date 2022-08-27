import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Material from "./Pages/Material/Material";
import Exam from "./Pages/Exam/Exam";
import Announcement from "./Pages/Announcement/Announcement";
import Protected from "./Components/Protected";
import MessageBoard from "./Pages/MessageBoard/MessageBoard";
import AdminShowQuestion from "./Pages/Exam/AdminShowQuestion";
import AttemptExam from "./Pages/Exam/AttemptExam";
import { useEffect } from "react";

// export const URL="http://localhost:5000/api";
export const URL="https://milktealab.herokuapp.com/api";
// export const URL="https://5ed6-182-177-246-36.eu.ngrok.io/api";


function App() {

  let user;
  user=localStorage.getItem("user");
  user=JSON.parse(user);

  return (
    <>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
        <Route path="/application" element={<Application></Application>}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/" element={<Protected />}>
              <Route path="/dashboard" element={
                <Layout>
                {
                  user?.role === "admin"?<Dashboard />:
                  user?.role === "member"?<MessageBoard />:
                  user?.role === "manager"?<ManagerDashboard />:
                  user?.role === "franchisee"?<FutureDashboard />:null}
                </Layout>}>

              </Route>
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}></Route>
              <Route path="/futuredashboard" element={<Layout><FutureDashboard /></Layout>}></Route>
              <Route path="/managerdashboard" element={<Layout><ManagerDashboard /></Layout>}></Route>
              <Route path="/setting" element={<Layout><Setting /></Layout>}></Route>
              <Route path="/training" element={<Layout><Training /></Layout>}></Route>
              <Route path="/download-material" element={<Layout><Material /></Layout>}></Route>
              <Route path="/exam" element={<Layout><Exam /></Layout>}></Route>
              <Route path="/announcement" element={<Layout><Announcement /></Layout>}></Route>
              <Route path="/message-board" element={<Layout><MessageBoard /></Layout>}></Route>
              <Route path="/admin-question" element={<Layout><AdminShowQuestion /></Layout>}></Route>
              <Route path="/attempt-exam" element={<Layout><AttemptExam /></Layout>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;


