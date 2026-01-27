import './App.css'
import { ButtonComponent } from './components/button/Button'
import React, {type ChangeEvent } from 'react'
import { InputComponent } from './components/input/Input'
import { useLogin } from './hooks/useLogin'
import './styles/form.styles.css'

function App() {
  const { setCredentials, loading, login, error } = useLogin();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))

  }
  return (
    <>
      <header>
        <h1>Estetica app</h1>
      </header>
      <main>

        <form
          className="form-login"
          onSubmit={(e: React.FormEvent<HTMLFormElement>)=> {
            e.preventDefault();
            login();
          }}
        >
          <legend>Iniciar sesion</legend>
          <InputComponent
            label='Usuario: '
            name='username'
            id='username'
            type='text'
            placeholder='cachito28'
            onChange={handleChange}

          />
          <InputComponent
            label='Contraseña:'
            name='password'
            id='password'
            type='password'
            placeholder='**********************'
            onChange={handleChange}
            error={error? error : undefined}
          />
          <ButtonComponent
            loading={loading}
            type='submit'
          >
            Ingresar
          </ButtonComponent>
        </form>
      </main>
    </>
  )
}

export default App
