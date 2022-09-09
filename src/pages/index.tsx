import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButon } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// interface para não ficar como any nosso produto
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news </title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} per month</span>
          </p>

          <SubscribeButon priceId={product.priceId} />
        </section>

        <img src="/images/mulher.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// fetch com o stripe
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LcoMFE0T2eLu5bjHKbVz218')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
