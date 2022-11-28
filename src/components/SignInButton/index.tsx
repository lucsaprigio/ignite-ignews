import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
    //verifica se o usuário está logado
    const { data: session } = useSession();
    console.log(session);

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#17eb76" />
            Lucas Aprigio
            <FiX color="#737380" className={styles.closeIcon} />
        </button >
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Button
        </button >
    )
}