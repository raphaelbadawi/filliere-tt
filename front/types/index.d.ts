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

export interface CommentAttributes {
    author: string,
    email: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    post: number,
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

export interface SearchParams {
    page?: number,
    tagId?: number,
};