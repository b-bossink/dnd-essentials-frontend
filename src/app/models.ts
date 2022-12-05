export interface Character {
    name: string;
    ownerId: number;
    class: string;
    race: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface User {
    id: number;
    username: string;
    emailaddress: string;
}