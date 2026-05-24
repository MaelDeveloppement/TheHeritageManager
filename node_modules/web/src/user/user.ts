import type { Role } from '../types/userTypes'

export interface UserProps {
    id: string;
    name: string;
    username: string;
    email: string;
    role: Role;
}

export class User {
    // 1. On déclare les types (Syntaxe purement effaçable)
    id: string;
    name: string;
    username: string;
    email: string;
    role: Role;

    // 2. On mange l'objet en paramètre
    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.role = props.role;
    }

    getUsername(): string {
        return this.username;
    }

    getName(): string {
        return this.name;
    }

    applyRole(): void {
        // Logique
    }
    greet(): void {
        alert(`Hello ${this.name}`);
    }
}