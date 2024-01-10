import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className=" app-bg ">
      <div className=" min-h-[100dvh] flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
