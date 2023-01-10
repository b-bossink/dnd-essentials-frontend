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

export interface Campaign {
    name: string;
    characterIds: number[];
    ownerId: number;
}

export interface User {
    id: number;
    username: string;
    emailaddress: string;
}