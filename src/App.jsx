import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Main } from './components/Main/Main'
import { Hoy } from './components/Hoy/Hoy'
import { More } from './components/More/More'
import { Inicio } from './components/Inicio/Inicio'
import { AllPinterest } from './AllPinterest'

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          <Route path='/all'   element={ <AllPinterest />}>
            <Route path='main'   element={ <Main /> } />
            <Route path='hoy'    element={ <Hoy />  } />
            <Route path='more'   element={ <More /> } />
          </Route>
          <Route path='/'      element={ <Inicio/>}/>
        </Routes>
      </div>
    </BrowserRouter>


  )
}

export default App
