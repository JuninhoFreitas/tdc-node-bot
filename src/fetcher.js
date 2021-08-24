const fetch = require("node-fetch");

module.exports = async function fetcher(pesquisa) {
  const retorno = await fetch(
    `https://servicespub.prod.api.aws.grupokabum.com.br/catalog/v1/products?query=${pesquisa}&page_number=1&page_size=20&facet_filters=&sort=most_searched&include=gift`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "client-id": "",
        "sec-ch-ua":
          '"Chromium";v="92", " Not A;Brand";v="99", "Microsoft Edge";v="92"',
        "sec-ch-ua-mobile": "?0",
        session: "134c80b1dc87d0b964126b5c3c4a876b",
      },
      referrer: "https://kabum.com.br/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }
  );

  return retorno;
};
