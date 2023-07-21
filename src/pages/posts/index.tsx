import Head from 'next/head'
import styles from './styles.module.scss'
import { GetStaticProps } from 'next'
import { createClient } from '@/src/prismicio'
import Link from 'next/link'

type Post = {
    slug: String;
    title: String;
    except: { text: String };
    updatedAt: String;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts( { posts }: PostsProps) {

    return (
        <>
            <Head>
                <title>Posts | Innews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {
                        posts.map((post) => (
                            <Link key={`post_${post.slug}`} href={`/posts/${post.slug}`}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.except.text}</p>
                            </Link>

                        ))
                    }
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {

const client = createClient({ previewData });
const response = await client.getAllByType('posts');

const PrismicDom = require('prismic-dom');

// console.log(JSON.stringify(response, null, 2));
// console.log(typeof(response))

const posts = response.map( (post) =>{
    return {
        slug: post.uid,
        title: PrismicDom.RichText.asText(post.data.title),
        except: post.data.content.find( (content: { type: string }) => content.type === 'paragraph') || '',
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }
})

  return {
    props: { posts },
  };
};