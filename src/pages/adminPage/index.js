import React from "react";
import BodyAdmin from "../../component/componentAdmin/bodyAdmin";
import SidebarAdmin from "../../component/componentAdmin/sidebar";
import "./style.scss";

export default function AdminPage() {
  return (
    <main className="admin-page container-fluid">
      <div className="admin-page__body row">
        <SidebarAdmin />
        <BodyAdmin />
      </div>
    </main>
  );
}
