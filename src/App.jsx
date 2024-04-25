
import "./App.css";

import Expense from "./expense";
import { Navigate ,RouterProvider,createBrowserRouter} from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./components/Login";

const ProtectedRoute=({children})=>{
  const[cookies]=useCookies();
  return cookies.token? children:<Navigate t0='/login'/>
}
const routes=createBrowserRouter([
  {
    path:"/expense",
    element:(
      <ProtectedRoute>
      <Expense/>
      </ProtectedRoute>
    )
  },
  {
    path:"/",
    Component:Login
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  );
}

export default App;
