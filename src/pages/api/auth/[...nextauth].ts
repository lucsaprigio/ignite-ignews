import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";

import { fauna } from '../../../services/faunadb';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: { params: { scope: 'read:user' } }
        }),
    ],
    callbacks: {
        // Assim que o usuário acessar essa função que é de entrar vai executa-la
        async signIn({ user, account, profile }) {
            const { email } = user

            try {
                await fauna.query( // FQL do Fauna
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'), // Collection que criamos la dentro do Fauna
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true
            } catch {
                return false
            }

        },
    }
})