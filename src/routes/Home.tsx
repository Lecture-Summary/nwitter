import { dbService } from 'fbase'
import { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  CollectionReference,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { Nweet } from 'types/nweet'

interface Props {
  userObj: User | null
}

const Home = ({ userObj }: Props) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState<Nweet[]>([])
  useEffect(() => {
    onSnapshot(
      collection(dbService, 'nweets') as CollectionReference<Nweet>,
      (snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setNweets(nweetArray)
      }
    )
  }, [])
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addDoc(collection(dbService, 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
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
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
