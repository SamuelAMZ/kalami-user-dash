import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const page = () => {
  return (
    <>
      <div className="site-container">
        <Sidebar />
        <div className="main">
          <Header page="Home" />
          <div className="centerer">
            <p>home</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
