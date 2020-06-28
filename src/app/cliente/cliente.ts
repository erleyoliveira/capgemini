import { Conta } from "../conta/conta";

export class Cliente {
    public nomeCompleto: string;
    public cpf: string;
    public senha: string;
    public valor: number;
    public conta: Conta;

    constructor(nomeCompleto: string, cpf: string, senha: string) {
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.senha = senha;
    }
}