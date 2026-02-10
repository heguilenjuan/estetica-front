import './App.css'
import React, { type ChangeEvent } from 'react'
import { useLogin } from './hooks/useLogin'
import './styles/form.styles.css'
import { ButtonComponent } from './components/molecules/button/Button';
import { InputComponent } from './components/molecules/input/Input';

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
    <main>
      <form
        className="form-login"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          login();
        }}
      >
        <fieldset>
          <legend>Iniciar sesion</legend>
          <InputComponent
            label='Usuario: '
            name='username'
            id='username'
            type='text'
            placeholder='cachito28'
            onChange={handleChange}
            defaultValue=''

          />
          <InputComponent
            label='Contraseña:'
            name='password'
            id='password'
            type='password'
            placeholder='**************'
            onChange={handleChange}
            defaultValue=''
            error={error ? error : undefined}
          />
          <ButtonComponent
            loading={loading}
            type='submit'
          >
            Ingresar
          </ButtonComponent>
        </fieldset>
      </form>
    </main>
  )
}

export default App
