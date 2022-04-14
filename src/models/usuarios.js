const conexao = require("../infraestrutura/conexao");

class Usuario {
  adiciona(usuario, res) {
    const clienteEhValido = usuario.nome.length >= 5;

    const validacoes = [
      {
        nome: "usuario",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const sql = "INSERT INTO Usuario SET ?";

      conexao.query(sql, usuario, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  }

  lista(res) {
    const sql = "SELECT * FROM Usuario";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Usuario WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE Usuario SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM Usuario WHERE id=?";

    conexao.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Usuario();
