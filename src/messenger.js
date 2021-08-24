module.exports = async function message(fetched_result, percentage) {
  const lista_fetch = await fetched_result.json();
  const list = [];
  lista_fetch.data.map((produto) => {
    const detail_product = produto.attributes;
    // data > attributes > title;
    // data > attributes > price;
    // data > attributes > price_with_discount;
    // data > attributes > discount_percentage;
    // data > id;
    if (detail_product.discount_percentage > percentage) {
      const dados_produto = {
        id: produto.id,
        texto: `
Titulo: ${detail_product.title}
Preço Original: ${detail_product.price}
Preço com Desconto: ${detail_product.price_with_discount}
Percentual de desconto: ${detail_product.discount_percentage}%
Link do produto: https://kabum.com.br/produto/${produto.id}
            `,
      };
      list.push(dados_produto);
    }
  });
  return list;
};
