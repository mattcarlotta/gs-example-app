import isEmpty from "lodash.isempty";

function Index({ data, error }) {
  return error ? (
    <p>{error}</p>
  ) : (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}

export async function getStaticProps() {
  let data = [];
  let error = "";
  try {
    const res = await fetch(
      "https://www.ajmadison.com/product3.0/packages.index.json.php?sku=RF28R7351SR",
      {
        method: "GET",
        headers: {
          // update with your user-agent
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          Accept: "application/json; charset=UTF-8",
        },
      }
    );

    if (res.status !== 200)
      throw String(`Invalid server response: ${res.status} ${res.statusText}`);

    data = await res.json();

    if (isEmpty(data)) throw String("No data was found!");
  } catch (e) {
    error = e.toString();
  }

  return {
    props: {
      data,
      error,
    },
  };
}

export default Index;
