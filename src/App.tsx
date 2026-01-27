import './App.css'
import { ButtonComponent } from './components/button/Button'
import React, { useRef } from 'react'
import { InputComponent } from './components/input/Input'

function App() {

  return (
    <>
      <header>
        <h1>Estetica app</h1>
      </header>
      <main>
        <form>
          <InputComponent />
          <InputComponent />
          <div>
            <ButtonComponent
              ref={useRef<HTMLButtonElement>(null)}
            >
              Ingresar
            </ButtonComponent>
          </div>
        </form>
      </main>
    </>
  )
}

export default App
