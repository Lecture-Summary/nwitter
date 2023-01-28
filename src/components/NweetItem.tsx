import { dbService } from 'fbase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Nweet } from 'types/nweet'

interface Props {
  nweetObj: Nweet
  isOwner: boolean
}

const NweetItem = ({ nweetObj, isOwner }: Props) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const onDeleteClick = () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      deleteDoc(doc(dbService, 'nweets', nweetObj.id))
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateDoc(doc(dbService, 'nweets', nweetObj.id), { text: newNweet })
    setEditing(false)
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setNewNweet(value)
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit your nweet'
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default NweetItem
