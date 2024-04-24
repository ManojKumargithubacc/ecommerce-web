import React from "react";
import Header from "./header/header.jsx";
import Footer from "./footer/footer.jsx";


function Layout({ children}) {
  return (
    <div>

      <Header />
      <main style={{ minHeight: "75vh" }}>
        {children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
