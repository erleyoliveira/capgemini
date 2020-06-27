export class Cliente {
    private nomeCompleto: string;
    private cpf: string;
    private senha: string;

    constructor(nomeCompleto: string, cpf: string, senha: string) {
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.senha = senha;
    }
}