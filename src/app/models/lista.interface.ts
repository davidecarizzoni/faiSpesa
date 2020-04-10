import { Prodotto } from './prodotto.interface';
import { User } from './user.interface';

export interface Lista {
    nome: string;
    prodotti: Prodotto[];
    user: User;
}