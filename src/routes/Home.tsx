import { dbService } from 'fbase'
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
} from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { Nweet } from 'types/nweet'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState<Nweet[]>([])
  const getNweets = async () => {
    const querySnapshot = await getDocs(
      collection(dbService, 'nweets') as CollectionReference<Nweet>
    )
    setNweets(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  useEffect(() => {
    getNweets()
  }, [])
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
