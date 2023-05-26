import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from "./pages/Homepage";
import InvalidPage from "./pages/InvalidPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import { RequireAuth } from "./components/RequireAuth";

const Test = () => <h1>Test Page</h1>



function App() {

  const { loading } = useSelector(state => state.alerts);

  return (
      <BrowserRouter> 
          {loading ? 
            <Spinner /> 
            : 
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="*" element={<InvalidPage/>} />
              <Route element={<RequireAuth />}>
                <Route path="" element={<Homepage/>}/>
                <Route path="/test" element={<Test />}/>
              </Route>
            </Routes>
          }
      </BrowserRouter>
  );
}

export default App;

