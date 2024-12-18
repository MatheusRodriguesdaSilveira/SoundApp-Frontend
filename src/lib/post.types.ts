interface PostProps {
    id: string
    title: string
    description: string;
    imageUrl: string
}


export interface Props{
    posts: PostProps[]
}