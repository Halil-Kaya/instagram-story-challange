export class GetStoriesAck {
    pagination: {
        offset?: number;
        page?: number;
        limit?: number;
        totalItemCount?: number;
        totalPageCount?: number;
        current?: number;
    };
    items: StoryItem[];
}

export class StoryItem {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
}
