import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from "./pages/Signup"
import Signin from "./pages/Signin";

function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;