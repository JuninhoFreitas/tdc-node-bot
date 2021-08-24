module.exports = async function returnMessage(fetch) {
  const result = await fetch.json();

  const retorno = [];

  result.data.map((produto) => {
    const detalhes_Produto = produto.attributes;
    const dados_Produto = {
      id: produto.id,
      texto: `
Titulo: ${detalhes_Produto.title}
Preço Original:${detalhes_Produto.price}
Preço com Desconto:${detalhes_Produto.price_with_discount}
Percentual de Desconto:${detalhes_Produto.discount_percentage}
Link: kabum.com.br/produto/${produto.id}
            `,
    };
    retorno.push(dados_Produto);
  });
  return retorno;
};
