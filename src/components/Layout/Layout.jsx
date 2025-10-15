import Navbar from "./Nav/Nav";
import Footer from "./Foot/Foot";
import { Helmet } from "react-helmet";

const Layout = ({
  children,
  title = "Welcome to Flytium",
  description = "We sell the best products for cheap",
  keywords = "electronics, buy electronics, cheap electronics",
  author = "Flytium",
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <main style={{ minHeight: "80vh" }}>{children}</main>
    </div>
  );
};

export default Layout;
