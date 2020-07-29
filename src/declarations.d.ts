declare module "*.png";

declare namespace Trivia {
    export interface Category{
        [key:string]:string|number;
        id: number;
        name: string;
    }
}