import Home from "./pages/home.jsx"
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Home />
      </BrowserRouter>
    </>
  );
}

export default App;
