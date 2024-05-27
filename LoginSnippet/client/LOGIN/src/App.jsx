import ForgetPassword from "./Pages/AUTH/ForgetPassword"
import SignIn from "./Pages/AUTH/SignIn"
import SignUp from "./Pages/AUTH/SignUp"
import { Button } from "./components/ui/button"
import { BrowserRouter as Router , Routes , Route  } from "react-router-dom"


function App() {

  return (
    <>
  <Router>
    <Routes>
        <Route path="/" element = {<SignUp/>}></Route>
        <Route path="/signIn" element = {<SignIn/>}></Route>
        <Route path = "/forget-password" element = {<ForgetPassword/>}></Route>
    </Routes>
  </Router>
    </>
  )
}

export default App
