import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<div className="text-red-500">Hello World</div>} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
