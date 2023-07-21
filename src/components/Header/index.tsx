import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'

export function Header() {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/logo.svg" alt="in.news" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <span>Home</span>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <span>Posts</span>
                    </ActiveLink>

                </nav>
                <SignInButton />
            </div>
        </header>
    )
}