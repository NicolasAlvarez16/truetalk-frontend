import LoginAndRegister from "./pages/loginAndRegister/LoginAndRegister"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import RightBar from "./components/rightbar/RightBar"
import LeftBar from "./components/leftbar/LeftBar"
import "./style.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import { AuthContext } from "./context/authContext"
import jwtDecode from "jwt-decode";

function App() {

  const { token } = useContext(AuthContext)

  const {darkMode} = useContext(DarkModeContext)

  const Layout = () => {
    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{display: "flex"}}>
            <LeftBar />
            <div style={{flex:6}}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
    )
  }

  const ProtectedRoute = ({children}) => {
      if (!token || isTokenExpired()) {
        console.log("Not fast enough hahah")
        return <Navigate to="/login" />
      }

    return children;
  }
  
  const isTokenExpired = () => {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <LoginAndRegister isRightPanelActive=""/>
    },
    {
      path: "/register",
      element: <LoginAndRegister isRightPanelActive="right-panel-active"/>
    }
  ])
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
  }
  
export default App;
