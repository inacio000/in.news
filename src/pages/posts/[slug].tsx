import { createClient } from "@/src/prismicio";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import styles from './post.module.scss'
import { ParsedUrlQuery } from "querystring";

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Innews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className={styles.postContent}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    if (!params || !('slug' in params)) {
        return {
          notFound: true, // Retorna página de erro 404 se não encontrar o slug
        };
      }
      
    const session = await getSession({ req });
    const PrismicDom = require('prismic-dom');
    const { slug } = params as ParsedUrlQuery;

    if (!(session?.activeSubscription)) {
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const prismic = createClient()

    const response = await prismic.getByUID('posts', String(slug), {});

    const post = {
        slug,
        title: PrismicDom.RichText.asText(response.data.title),
        content: PrismicDom.RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return {
        props: {
            post,
        }
    }
}