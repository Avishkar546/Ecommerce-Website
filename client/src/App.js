import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from "./Pages/About";
import Product from "./Pages/Product";
import Policy from "./Pages/Policy";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
