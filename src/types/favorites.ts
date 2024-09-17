type Favorite = {
  url: string;
  name: string;
  icon: string;
}

type Favorites = {
  parent_type: string
  children_type: string
  isOpen: boolean
  favorites?: Favorite[]
}
