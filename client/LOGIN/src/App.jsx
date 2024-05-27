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
    </Routes>
  </Router>
    </>
  )
}

export default App
