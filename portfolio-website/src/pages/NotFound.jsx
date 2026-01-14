import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/common/Button";

const NotFound = () => (
  <Layout>
    <section className="section pt-28">
      <div className="container text-center space-y-4 text-white">
        <p className="text-6xl font-bold">404</p>
        <p className="text-lg text-gray-300">This page drifted away.</p>
        <Link to="/">
          <Button variant="primary">Back Home</Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default NotFound;
