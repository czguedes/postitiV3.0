import { RecadoState } from '../Recados';
import { UsuarioState } from '../Usuarios';

export type RespostaCadastro = {
	sucesso: boolean;
	mensagem: string;
	dadoCadastrado?: UsuarioState & { id: string };
};

export type RespostaRecado = {
	sucesso: boolean;
	mensagem: string;
	dadoCadastrado?: RecadoState;
};
