import React from "react";
import Head from "next/head";
import { GetStaticProps } from 'next'
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | in.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publication <br/> 
            <span>for {product.amount}</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/Mulher.png" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1NKFGnKaH69qLKjvSta7tGJ2')
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}