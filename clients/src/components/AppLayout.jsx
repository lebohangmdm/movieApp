import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
