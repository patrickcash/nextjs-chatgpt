import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [product, setProduct] = useState('');
  const [keywords, setKeywords] = useState('');
  const [audience, setAudience] = useState('');
  const [style, setStyle] = useState('');
  const [readingLevel, setReadingLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, keywords, audience, style, readingLevel }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);      
    } catch(error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Market Copywriting Generator</title>
        <meta name="description" content="Generate marketing copy using ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.title}>
         <h1>Marketing Copywriting Generator</h1>
      </div>
     
      <main className={styles.main}>
        <div className={styles.form}>
          <form onSubmit={onSubmit}>
            <label>What is this copywriting describing?</label>
            <input
              type="text"
              name="product"
              placeholder="ie restaurant, camera, etc"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />

            <label>What are the Keywords for this product?</label>
            <input
              type="text"
              name="keywords"
              placeholder="more the better"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <label>What is the audience for this product?</label>
            <input
              type="text"
              name="audience"
              placeholder="adults, children, new moms, etc."
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />

            <label>What is the writing style for the copy?</label>
            <select
              name="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>

            <label>What level should the writing be?</label>
            <select
              name="readingLevel"
              value={readingLevel}
              onChange={(e) => setReadingLevel(e.target.value)}
            >
              <option value="6th grade">6th Grade</option>
              <option value="9th grade">9th Grade</option>
              <option value="9th grade">12th Grade</option>
              <option value="college">College</option>
            </select>


            <input type="submit" value="Generate Copy" />
          </form>
        </div>
        <div className={styles.result}>
        {loading && (
          <div>
            <h3>Generating marketing copy...</h3>
          </div>
        )}
        {result && (<>
            <div className={styles.result_text}>{result}</div>
          </>
        )}
        </div>
      </main>
    </div>
  )
}

export default Home
