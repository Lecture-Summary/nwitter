import { authService } from 'fbase'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password)
      } else {
        await signInWithEmailAndPassword(authService, email, password)
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      }
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev)
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    if (!provider) return
    await signInWithPopup(authService, provider)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  )
}

export default Auth
