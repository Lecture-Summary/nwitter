export interface NweetDocument {
  text: string
  createdAt: Date
  creatorId: string
}
export interface Nweet extends NweetDocument {
  id: string
}
