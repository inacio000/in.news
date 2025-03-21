import { createClient } from "@/src/prismicio";
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import styles from '../post.module.scss'
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import router from "next/router";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

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
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading
                        <Link href="/">
                            Subscribe now
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const PrismicDom = require('prismic-dom');
    const { slug } = params as ParsedUrlQuery;

    const prismic = createClient()

    const response = await (await prismic.getByUID('posts', String(slug), {}));

    const post = {
        slug,
        title: PrismicDom.RichText.asText(response.data.title),
        content: PrismicDom.RichText.asHtml(response.data.content.slice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return {
        props: {
            post,
        },
        redirect: 60 * 30,
    }
}