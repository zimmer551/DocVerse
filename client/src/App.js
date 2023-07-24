import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Homepage from "./pages/Homepage";
import InvalidPage from "./pages/InvalidPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import { RequireAuth } from "./components/RequireAuth";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";

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
                <Route exact path="" element={<Homepage/>}/>
                <Route path="/apply-doctor" element={<ApplyDoctor />}/>
                <Route path="/notification" element={<Notification />}/>
              </Route>
            </Routes>
          }
      </BrowserRouter>
  );
}

export default App;

