export interface Post {
    id: number,
    attributes: {
        title: string,
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

export interface SearchParams {
    page?: number;
  };