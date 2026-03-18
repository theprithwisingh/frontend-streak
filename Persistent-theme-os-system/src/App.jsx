import React from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
};

function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
