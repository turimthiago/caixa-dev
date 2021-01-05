import request from "supertest";
import { sign } from "jsonwebtoken";
import { MongoHelper } from "../../../src/infra/helpers";
import app from "../../../src/main/config/app";
import env from "../../../src/main/config/env";
import { Movimentacao } from "../../../src/domain/models";

let usuarioCollection;
let categoriaCollection;
let movimentacaoCollection;

interface MovimentacaoMockTypes {
  accessToken: string;
  usuarioId: string;
  categoriaId: string;
}

const mockAccessToken = async (): Promise<MovimentacaoMockTypes> => {
  const res = await usuarioCollection.insertOne({
    email: "turimthiago@gmail.com",
    password: "123",
  });
  const usuarioId = res.ops[0]._id;
  const accessToken = sign({ id: usuarioId }, env.jwtSecret);
  const categoriaId = await mockCategoria();
  return { accessToken, usuarioId, categoriaId };
};

const mockCategoria = async (): Promise<string> => {
  const res = await categoriaCollection.insertOne({
    nome: "Categoria Teste",
  });
  const categoriaId = res.ops[0]._id;
  return categoriaId;
};

const mockMovimentacoes = async (
  usuarioId: string,
  categoriaId: string
): Promise<Movimentacao> => {
  const res = await movimentacaoCollection.insertOne({
    idUsuario: usuarioId,
    categoria: {
      id: categoriaId,
    },
    data: "2021-01-04",
    tipo: "ENTRADA",
    valor: "1.99",
    descricao: "Descrição do lançamento",
  });
  const movimentacao = MongoHelper.map(res.ops[0]);
  return movimentacao;
};

describe("Rotas Movimentação Carteira", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    usuarioCollection = await MongoHelper.getCollection("usuarios");
    await usuarioCollection.deleteMany({});

    categoriaCollection = await MongoHelper.getCollection("categorias");
    await categoriaCollection.deleteMany({});

    movimentacaoCollection = await MongoHelper.getCollection("movimentacoes");
    await movimentacaoCollection.deleteMany({});
  });

  test("Deve retornar 403 ao salvar sem accessToken", async () => {
    await request(app).post("/api/movimentacoes").send({}).expect(403);
  });

  test("Deve retornar 200 movimentação com sucesso", async () => {
    const { accessToken } = await mockAccessToken();
    const categoriaId = await mockCategoria();
    await request(app)
      .post("/api/movimentacoes")
      .set("x-access-token", accessToken)
      .send({
        categoria: {
          id: categoriaId,
        },
        data: "2021-01-04",
        tipo: "ENTRADA",
        valor: "1.99",
        descricao: "Descrição do lançamento",
      })
      .expect(200);
  });

  test("Deve retornar 403 ao buscar resumo sem accessToken", async () => {
    await request(app).get("/api/movimentacoes").send({}).expect(403);
  });

  test("Deve retornar 200 ao buscar resumo", async () => {
    const { accessToken, usuarioId, categoriaId } = await mockAccessToken();
    const movimentacao = await mockMovimentacoes(usuarioId, categoriaId);
    await request(app)
      .get("/api/movimentacoes/?data=2021-01-04")
      .set("x-access-token", accessToken)
      .expect(200);
  });
});
