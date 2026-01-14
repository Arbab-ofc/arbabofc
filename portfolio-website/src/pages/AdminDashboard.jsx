import React from "react";
import Layout from "../components/layout/Layout";
import Dashboard from "../components/admin/Dashboard";
import SEOHead from "../components/seo/SEOHead";

const AdminDashboard = () => (
  <Layout>
    <SEOHead title="Admin Dashboard" />
    <section className="section pt-28">
      <div className="container">
        <Dashboard />
      </div>
    </section>
  </Layout>
);

export default AdminDashboard;
