import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
