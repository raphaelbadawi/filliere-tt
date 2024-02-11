interface CardAttributes {
    title: string,
    caption?: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    picture: {
        data: {
            attributes: {
                formats: {
                    large: {
                        url: string
                    },
                    medium: {
                        url: string
                    },
                    small: {
                        url: string
                    }
                    thumbnail: {
                        url: string
                    },
                }
            }
        }
    }
}

export interface Card {
    id: number,
    attributes: CardAttributes,
}

export interface CommentPostAttributes {
    author: string,
    email: string,
    content: string, 
    post: number,
    publishedAt?: string|null,
}

export interface CommentAttributes extends CommentPostAttributes {
    createdAt: string,
    updatedAt: string,
}

export interface TagAttributes {
    tag: string,
}

export interface Comment {
    id: number,
    attributes: CommentAttributes,
}

export interface Tag {
    id: number,
    attributes: TagAttributes,
}

interface PostAttributes extends CardAttributes {
    slug: string,
    createdBy: {
        data: {
            id: number,
            attributes: {
                firstname: string,
                lastname: string,
            }
        }
    },
    comments: {
        data: Comment[],
    },
    tags: {
        data: Tag[],
    }
}

export interface Post extends Card {
    attributes: PostAttributes,
}

export interface ContestAttributes {
    teamName: string,
    contestName: string,
    requestBody: string,
    teamId: number,
}

export interface Contest extends Card {
    attributes: ContestAttributes,
}

export interface SearchParams {
    page?: number,
    tagId?: number,
};