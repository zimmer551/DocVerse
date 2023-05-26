import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import Homepage from "./pages/Homepage";
import InvalidPage from "./pages/InvalidPage";
import Login from "./pages/Login";
import Register from "./pages/Register";


export const router = createBrowserRouter(
    createRoutesFromElements(
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="*" element={<InvalidPage/>} />
              <Route element={<RequireAuth />}>
                <Route path="" element={<Homepage/>}/>
                {/* <Route path="/test" element={<Test />}/> */}
              </Route>
            </Routes>
    )
)