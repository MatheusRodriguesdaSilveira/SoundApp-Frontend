interface PostProps {
    id: string
    title: string
    description: string;
    imageUrl: string
}

interface UserData {
    user: string;
    id: string;
    name: string;
    email: string;
    descriptionProfile: string;
    blogProfile: string;
    linkedinProfile: string;
    profilePicture: string;
    createdAt: string;
    title: string;
    imageUrl: string;
    description: string;
    comments: string;
    content: string;
  }

 export interface ButtonCommentProps {
    post: UserData;
  }
export interface Props{
    posts: PostProps[]
}