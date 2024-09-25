interface CardAttributes {
  title: string;
  caption?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  picture: {
    formats: {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
}

export interface Card extends CardAttributes {
  documentId: string;
}

export interface CommentPostAttributes {
  author: string;
  email: string;
  content: string;
  post: string;
  publishedAt?: string | null;
}

export interface CommentAttributes extends CommentPostAttributes {
  createdAt: string;
  updatedAt: string;
}

export interface TagAttributes {
  tag: string;
}

export interface Comment extends CommentAttributes {
  documentId: string;
}

export interface Tag extends TagAttributes {
  documentId: string;
}

interface PostAttributes extends CardAttributes {
  slug: string;
  createdBy: {
      documentId: string;
      firstname: string;
      lastname: string;
  };
  comments: Comment[];
  tags: Tag[];
}

export interface Post extends Card, PostAttributes {}

export interface ContestAttributes extends CardAttributes {
  teamName: string;
  teamId: number;
}

export interface Contest extends Card, ContestAttributes {}

interface LadderItem {
  node: Node;
}

interface Node {
  definitivePoints: string;
  definitiveRank: number;
  forfeit: number;
  gamePointLost: number;
  gamePointWin: number;
  id: string;
  modified: boolean;
  opponent: Opponent;
  penality: number;
  pointsModified: boolean;
  sportMatchCount: number;
  sportMatchDraw: number;
  sportMatchLost: number;
  sportMatchWin: number;
}

interface Opponent {
  id: string;
  team: Team;
}

interface Team {
  id: string;
  name: string;
}

export type Ladder = LadderItem[];

export interface Result {
  node: {
    awayGamePoints: number;
    awayOpponent: Opponent;
    date: string;
    day: {
      id: string;
    };
    forfeit: null | boolean;
    hasWarnings: boolean;
    homeGamePoints: number;
    homeOpponent: Opponent;
    id: string;
    penalty: null | string;
    roundNumber: number;
    winner: "away" | "home" | string;
  };
}

export type Results = Result[];

export interface SearchParams {
  page?: number;
  tagId?: string;
}

export interface Subscriber {
  documentId: string;
  email: string;
  hash: string;
}
