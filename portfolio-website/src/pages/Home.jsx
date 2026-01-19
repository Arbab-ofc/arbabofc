import React from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import StudyRoadmap from "../components/sections/StudyRoadmap";
import Projects from "../components/sections/Projects";
import Blog from "../components/sections/Blog";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";
import SEOHead from "../components/seo/SEOHead";
import StructuredData from "../components/seo/StructuredData";

const Home = () => (
  <Layout>
    <SEOHead />
    <StructuredData />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <StudyRoadmap />
    <Projects />
    <Blog />
    <Achievements />
    <Contact />
  </Layout>
);

export default Home;
