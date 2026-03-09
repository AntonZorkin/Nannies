export interface Review {
  reviewer: string
  rating: number
  comment: string
}

export interface Nanny {
  id: string
  about: string
  avatar_url: string
  birthday: string
  characters: string[]
  education: string
  experience: string
  kids_age: string
  location: string
  name: string
  price_per_hour: number
  rating: number
  reviews: Review[]
}
