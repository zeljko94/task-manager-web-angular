import { Board } from "./board";
import { User } from "./user";

export class Project {
    id: string = '';
    name: string = ''; 
    description: string = '';
    members: User[] = [];
    boards: Board[] = [];
    createdByUserId: string = '';
}