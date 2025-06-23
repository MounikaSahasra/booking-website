import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard"; // or route children

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1 }}>
        <AdminDashboard />
      </div>
    </div>
  );
}

export default AdminLayout;
