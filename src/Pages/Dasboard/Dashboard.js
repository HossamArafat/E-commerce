import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dasboard/SideBar";
import TopBar from "../../Components/Dasboard/TopBar";
import '../../CSS/pages/dashboard/dashboard.css'

export default function Dashboard() {
    return (
        <div className="postion-relative">
            <TopBar/>
            <div className="dashboard d-flex gap-1" style={{marginTop: '70px'}}>
                <SideBar/>
                <Outlet/>
            </div>
        </div>
    )
}