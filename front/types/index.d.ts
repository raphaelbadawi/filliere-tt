export interface Card {
    id: number,
    attributes: {
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
}

export interface Post extends Card {}

export interface SearchParams {
    page?: number;
  };