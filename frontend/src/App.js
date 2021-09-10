import Home from "./pages/home.jsx"
import Note from "./pages/Note.jsx"
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Home />
        <Note />
      </BrowserRouter>
    </>
  );
}

export default App;
