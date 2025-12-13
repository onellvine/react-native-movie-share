/* Typescript types/interfaces for the project */

export interface Movie {
    id: number;
    title: string;
    cast: Array<string>;
    category: string;
    comments?: number;
    cover_photo?: string;
    genre?: Array<string>;
    rating?: number,
    released?: number    
};
