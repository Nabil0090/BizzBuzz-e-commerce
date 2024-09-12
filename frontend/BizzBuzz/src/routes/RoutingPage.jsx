import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";

function RoutingPage() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default RoutingPage;
