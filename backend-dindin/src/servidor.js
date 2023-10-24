const cors = require('cors');
const express = require('express');
const app = express();

let { usuarios, identificadorUnico } = require('./bancodedados')

app.use(cors())
app.use(express.json());


app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const emailExiste = usuarios.find((e) => e.email === email)

  if (emailExiste) {
    return res.sendStatus(400).send('Esse email ja foi cadastrado')
  }

  const usuario = {
    id: identificadorUnico++,
    nome: nome,
    email: email,
    senha: senha,
    transacoes: {
      identificadorUnicoTransacao: 1,
      listaTransacoes: []
    }
  }

  usuarios.push(usuario);

  return res.status(201).json(usuario)
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body.usuarioLogin;

  const usuarioEmail = usuarios.find((e) => e.email === email);

  const tokenLogin = Math.random().toString(16).substr(2);

  if (usuarioEmail.senha === senha) {
    return res.send({ id: usuarioEmail.id, token: tokenLogin }).status(201)
  } else {
    return res.status(400).send('E-mail e/ou senha incorretos.')
  }
});

app.get('/transacoes/:id', (req, res) => {
  const { id } = req.params;

  const usuarioObj = usuarios.find((e) => e.id === Number(id));

  res.send({ nomeUsuario: usuarioObj.nome, listaTransacoes: usuarioObj.transacoes.listaTransacoes });
})

app.post('/addtransacao', (req, res) => {
  const { idUsuario, data, dataJS, diaSemana, descricao, categoria, valor, tipo } = req.body;

  const encontrarUsuarioId = usuarios.findIndex((e) => idUsuario === e.id)

  const usuarioTransacaoNova = {
    id: usuarios[encontrarUsuarioId].transacoes.identificadorUnicoTransacao++,
    data: data,
    dataJS: dataJS,
    diaSemana: diaSemana,
    descricao: descricao,
    categoria: categoria,
    valor: valor,
    tipo: tipo
  }

  usuarios[encontrarUsuarioId].transacoes.listaTransacoes.push(usuarioTransacaoNova);

  res.sendStatus(200);
})

app.delete('/transacao/:idTransacao/usuario/:idUsuario', (req, res) => {
  const { idTransacao, idUsuario } = req.params;

  const usuario = usuarios.find((e) => e.id === Number(idUsuario));

  const transacoesUsuarioDeletado = usuario.transacoes.listaTransacoes.filter((e) => e.id !== Number(idTransacao))

  usuarios[Number(idUsuario) - 1].transacoes.listaTransacoes = transacoesUsuarioDeletado;

  res.sendStatus(200);
})

app.post('/edittransacao', (req, res) => {
  const { idUsuario, id, data, dataJS, diaSemana, descricao, categoria, valor, tipo } = req.body;

  const encontrarUsuarioId = usuarios.findIndex((e) => idUsuario === e.id)
  const encontrarTransacaoUsuario = usuarios[encontrarUsuarioId].transacoes.listaTransacoes.findIndex((e) => id === e.id)

  const novaTransacao = {
    id,
    data,
    dataJS,
    diaSemana,
    descricao,
    categoria,
    valor,
    tipo
  }

  usuarios[encontrarUsuarioId].transacoes.listaTransacoes[encontrarTransacaoUsuario] = novaTransacao
  res.sendStatus(200);
})

module.exports = app;