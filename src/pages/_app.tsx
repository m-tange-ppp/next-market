import "../styles/globals.css"
import Header from "../components/header";
import Footer from "../components/footer";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container">
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    )
}
