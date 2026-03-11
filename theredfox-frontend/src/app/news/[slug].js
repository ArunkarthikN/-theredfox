import Head from "next/head";

export default function Article({article}) {

  if(!article) return <p>Loading...</p>

  return (

    <div style={{maxWidth:"800px",margin:"auto"}}>

      <Head>

        <title>{article.seo_title || article.title}</title>

        <meta name="description" content={article.summary} />

        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.image} />

        <meta name="twitter:card" content="summary_large_image"/>

      </Head>

      <h1>{article.title}</h1>

      <img src={article.image} style={{width:"100%"}} />

      <p>{article.content}</p>

    </div>

  );

}

export async function getServerSideProps(context){

  const res = await fetch(
    `https://theredfox.us/api/articles/${context.params.slug}`
  );

  const article = await res.json();

  return { props: { article } };

}
