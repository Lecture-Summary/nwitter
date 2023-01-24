import { Nweet } from 'types/nweet'

interface Props {
  nweetObj: Nweet
  isOwner: boolean
}

const NweetItem = ({ nweetObj, isOwner }: Props) => {
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  )
}

export default NweetItem
