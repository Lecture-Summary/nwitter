import NweetItem from 'components/NweetItem'
import { nweetCollection } from 'fbase'
import { User } from 'firebase/auth'
import { addDoc, onSnapshot } from 'firebase/firestore'
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
    onSnapshot(nweetCollection, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setNweets(nweetArray)
    })
  }, [])
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userObj) return
    await addDoc(nweetCollection, {
      text: nweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
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
          <NweetItem
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
