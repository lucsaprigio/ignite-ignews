import Stripe from 'stripe';
import { version } from '../../package.json'

// Conexão com a API do stripe
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY, // variavel ambiente da key
    {
        apiVersion: '2022-08-01', // Versão da api
        appInfo: {
            name: 'Ignews',
            version
        }
    }
) 