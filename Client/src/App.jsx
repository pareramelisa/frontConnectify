import isoLogo from './assets/logo.svg'
import connectifyLogo from '/connectify.svg'
import './App.css'

import NavBar from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'


function App() {
 

  return (
    <>
      <NavBar/>
      {/* <div>
        <a href="https://github.com/GiseleCuello/Connectify/tree/main" target="_blank">
          <img src={isoLogo} className="logo-spiner" alt="iso logo Connectify" />
        </a>
      </div>
      <img src={connectifyLogo} className="logo" alt="Connectify logo" /> */}
    <Footer/>
    </>
    
  )
}

export default App