import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../pages/_app";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, loader }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);



  useEffect(() => {
    router.events.on("routeChangeComplete", () => loader(false));
    router.events.on("routeChangeStart", () => loader(true));
    loader(false);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    
    if (!token) {
      router.replace("/");
    }
  }, [user, router.isReady]);

  return (
    <>
      <div className="flex-1 flex-col bg-white relative">
        <div className="fixed w-full top-0 z-50">
          <Navbar
            user={user}
            setUser={setUser}
            loader={loader}
          />
        </div>
        <div className={`md:pt-16 pt-14  z-0 max-w-screen  overflow-x-hidden`}>
          <main className="flex-1">{children}</main>
        </div>
        <Footer loader={loader} />
      </div>
    </>
  );
};

export default Layout;
