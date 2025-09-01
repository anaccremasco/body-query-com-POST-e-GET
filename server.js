// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const {bruxos, varinhas, animais, pocoes} = dados;


// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3000;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome
    } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()))
    };
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//body
app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            sucess: false,
            message: "Nome, casa, ano e estado de vida são obrigatórios"
        })
    }


    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        ano: parseInt (ano),
        varinha: varinha || "Ainda não definida.",
        mascote: mascote || "Ainda não definido.",
        patrono: patrono || "Ainda não descoberto.",
        especialidade: especialidade || "Ainda não realizado.",
        vivo: vivo
    };

    bruxos.push(novoBruxo);

    res.status(201).json ({
        sucess: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

// Varinhas
app.get('/varinhas', (req, res) => {
  const { material, nucleo, comprimento} = req.query;
  let resultado = varinhas;

if (material) {
  resultado = resultado.filter(v => v.material.toLowerCase().includes(material.toLowerCase()));
}

if (nucleo) {
  resultado = resultado.filter(v => v.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
}

if (comprimento) {
  resultado = resultado.filter(v => v.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
}

res.status(200).json({
  total: resultado.length,
  data: resultado
})
});

// Poções
app.get('/pocoes', (req, res) => {
  const { nome, efeito,} = req.query;
  let resultado = pocoes;

if (nome) {
  resultado = resultado.filter(v => v.nome.toLowerCase().includes(nome.toLowerCase()));
}

if (efeito) {
  resultado = resultado.filter(v => v.efeito.toLowerCase().includes(efeito.toLowerCase()));
}

res.status(200).json({
  total: resultado.length,
  data: resultado
})
});

// Animais
app.get('/animais', (req, res) => {
  const { tipo, nome,} = req.query;
  let resultado = animais;

if (tipo) {
  resultado = resultado.filter(v => v.tipo.toLowerCase().includes(tipo.toLowerCase()));
}

if (nome) {
  resultado = resultado.filter(v => v.nome.toLowerCase().includes(nome.toLowerCase()));
}

res.status(200).json({
  total: resultado.length,
  data: resultado
})
});

//Varinha nova
app.post("/varinhas", (req, res) => {
  const {material, nucleo, comprimento} = req.body;

  if (!material || !nucleo|| !comprimento) {
      return res.status(400).json({
          sucess: false,
          message: "Material, nucleo e comprimento são obrigatórios"
      })
  }


  const novaVarinha = {
      id: varinhas.length + 1,
      material: material,
      nucleo: nucleo,
      comprimento: comprimento
  };

  varinhas.push(novaVarinha);

  res.status(201).json ({
      sucess: true,
      message: "Nova varinha adicionada!",
      data: novaVarinha
  });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});