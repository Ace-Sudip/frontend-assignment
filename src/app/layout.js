"use client"
import { ReactQueryProvider } from '@/components/ReactQueryProvier'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from '@/components/Header'
import store from './store';
import { Provider } from 'react-redux';
import {cartTotal} from '@/features/cart/cartSlice'

store.dispatch(cartTotal());

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: 'Welcome to Online Store',
  description: 'Shop your favorite accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReactQueryProvider>
        <Provider store={store}>
          <Header/>
        {children}
        </Provider>
        </ReactQueryProvider>
        </body>
    </html>
  )
}
