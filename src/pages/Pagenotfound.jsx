import Layout from '../components/Layout/Layout';


const Pagenotfound = () => {
  return (
    <Layout title={"404 Page Not Found"} description={"404 Page Not Found"}>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted">
          Oops! The page you are looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary">
          Go Back Home
        </a>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
