import Head from 'next/head'
import styles from './styles.module.scss'
import { GetStaticProps } from 'next'
import { createClient } from '@/src/prismicio'
import { PrismicRichText } from '@prismicio/react'

export default function Posts() {

    return (
        <>
            <Head>
                <title>Posts | Innews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>26th July 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a href='#'>
                        <time>26th July 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a href='#'>
                        <time>26th July 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a href='#'>
                        <time>26th July 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {

const client = createClient({ previewData });
const response = await client.getAllByType('posts');

console.log(JSON.stringify(response, null, 2));

const posts = response.results.map( (post: { uid: any; data: { date: { title: any; content: any[] } } }) =>{
    return {
        slug: post.uid,
        title: PrismicRichText.asText(post.data.date.title),
        except: post.data.date.content.find( (content: { type: string }) => content.type === 'paragraph')?.text ?? '',
    }
})


  return {
    props: {response},
  };
};