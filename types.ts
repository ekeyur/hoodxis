export type User = {
  id: string
  name?: string
  email:string
  created_at: string
  hood_id?: string
}

export type Reservation = {
  created_at: string
  id: string
  user_id: string
  court_id: string
  start: string
  end: string
  description?: string
}


export type Court = {
  id: string
  created_at: string
  name?: string
  description?: string
  hood_id?: string
  reservations?: Array<Reservation>
}

export type Hood = {
  id: string
  created_at: string
  name?: string
  city?:string
  zip?: string
  courts?: Array<Court>
}

export type Event = {
  id: string,
  start: Date
  end: Date
  title?: string
  resourceId: string
  description?: string
}