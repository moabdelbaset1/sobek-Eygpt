import { Metadata } from 'next';
import AccountPage from'./AccountPage';
 

export const metadata: Metadata = {
  title: 'Account Sign In or Join - Dav Egypt',
  description: 'Sign in to your Dav Egypt account or create a new account to access exclusive benefits, track orders, save favorites, and enjoy express checkout for medical uniforms and scrubs.',
  keywords: 'account login, sign in, create account, Dav Egypt, medical uniforms, scrubs, healthcare apparel, order tracking, exclusive offers',
  
  openGraph: {
    title: 'Account Sign In or Join - Dav Egypt',
    description: 'Access your Dav Egypt account for exclusive benefits, order tracking, and personalized shopping experience for medical uniforms and scrubs.',
  }
}

export default function Page() {
  return <AccountPage />
}