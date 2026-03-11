import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    fetch("https://theredfox.us/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data));

  }, []);

  return (

    <div style={{maxWidth:"800px",margin:"auto"}}>

      <Head>
        <title>TheRedFox News</title>
        <meta name="description" content="Latest news and tech updates from TheRedFox."/>
      </Head>

      <h1>TheRedFox News</h1>

      {articles.map(article => (

        <div key={article.id} style={{marginBottom:"30px"}}>

          <a href={`/news/${article.slug}`}>
            <h2>{article.title}</h2>
          </a>

          <p>{article.summary}</p>

        </div>

      ))}

    </div>

  );

}
