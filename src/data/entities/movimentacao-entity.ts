export interface MovimentacaoEntity {
  id: string;
  idUsuario: string;
  data: Date;
  categoriaId: string;
  tipo: string;
  valor: number;
  descricao: string;
}
