import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HomeDashboard from "../Home/HomeDashboard";
import Attendance from "../Attendance/Attendance";
import { Routes, Route } from "react-router-dom";
import "./MainLayout.css";
import RegulariseForm from "../Attendance/RegulariseRequest/RegulariseForm";
import LeaveRequest from "../Leave/LeaveRequest";
import Expanses from "../Expanses/Expanses";
import Profile from "../Profile/ProfileOverview";
import ITComputation from "../ITComputation/ITComputation";
import Salary from "../Salary/Salary";
import MyLeave from "../Leave/MyLeave";
import HolidayPage from "../Leave/Holidays/HolidayPage";
import StatusTabs from "../Attendance/RegulariseRequest/StatusTab";
import RegularisseRequest from "../TeamsRequest/Regularise/RegularisseRequest";
import TeamLeavereq from "../TeamsRequest/Leave/TeamLeavereq";
import ProfileOverview from '../Profile/ProfileOverview';
import ProfileJoining from '../Profile/ProfileJoining';
import ProfileAddress from '../Profile/ProfileAddress';
import ProfileAttendance from '../Profile/ProfileAttendance';
import ProfileSalary from '../Profile/ProfileSalary';
import ProfilePersonal from '../Profile/ProfilePersonal';
import ProfileInfo from '../Profile/ProfileInfo';
import ProfileExit from '../Profile/ProfileExit';
import ProfileConnections from '../Profile/ProfileConnections';
import EmploymentOfferLetter from "../JobOffer/EmploymentOfferLetter";
 
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* Main routes */}
          <Route index element={<HomeDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaverequest" element={<LeaveRequest />} />
          <Route path="myleave" element={<MyLeave />} />
          <Route path="holiday-list" element={<HolidayPage />} />
          <Route path="salary" element={<Salary />} />
          <Route path="it" element={<ITComputation />} />
          <Route path="expenses" element={<Expanses />} />
          <Route path="regularise" element={<RegulariseForm />} />
          <Route path="regulrise-status" element={<StatusTabs />} />
          <Route path="joboffer" element={<EmploymentOfferLetter/>}/>
         
          {/* Team requests */}
          <Route path="reg-req" element={<RegularisseRequest />} />
          <Route path="team's-leave-request" element={<TeamLeavereq />} />
          {/* Profile routes - all relative paths */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/overview" element={<ProfileOverview />} />
          <Route path="profile/joining" element={<ProfileJoining />} />
          <Route path="profile/address-contacts" element={<ProfileAddress />} />
          <Route path="profile/attendance-leaves" element={<ProfileAttendance />} />
          <Route path="profile/salary" element={<ProfileSalary />} />
          <Route path="profile/personal" element={<ProfilePersonal />} />
          <Route path="profile/profile-info" element={<ProfileInfo />} />
          <Route path="profile/exit" element={<ProfileExit />} />
          <Route path="profile/connections" element={<ProfileConnections />} />
          
        </Routes>
      </div>
    </div>
  );
};
 
export default MainLayout;



