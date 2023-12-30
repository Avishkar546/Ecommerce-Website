import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from "./Pages/About";
import Product from "./Pages/Product";
import Policy from "./Pages/Policy";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage title={"Home - Best Offers"} description={"This is description"} />} />
            <Route path="/about" element={<About title={"About us"} description={"This is description"} />} />
            <Route path="/product" element={<Product title={"Our products"} description={"This is description"} />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
