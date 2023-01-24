import { dbService } from 'fbase'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
      createdAt: Date.now(),
    })
    setNweet('')
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setNweet(value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='Nweet' />
      </form>
    </div>
  )
}

export default Home
