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
          <span>👏 Привет, добро пожаловать</span>
          <h1>Новости о мир <span>ИТ</span>.</h1>
          <p>
          Получите доступ ко всем публикациям <br/> 
            <span>за {product.amount} в месяц</span>
          </p>
          <SubscribeButton priceId={product.productId}/>
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
    }).format(price.unit_amount! / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}