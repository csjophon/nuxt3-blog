type Favorite = {
  url: string;
  desc: string
  name: string;
  icon: string;
}

type Children = {
  children_type: string
  favorites?: Favorite[]
}

type Favorites = {
  parent_type: string
  isOpen: boolean
  children: Children[]
}
