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

interface PostAttributes extends CardAttributes {
    slug: string,
}

export interface Post extends Card {
    attributes: PostAttributes,
}

export interface SearchParams {
    page?: number,
};