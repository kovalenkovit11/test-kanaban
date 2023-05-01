export interface Story{
    id: string;
    title: string;
    autor: string;
    comments: number;
    subTitle:string;
}
export interface Board{
    id: string,
    title: string,
    stories: [] 
}

