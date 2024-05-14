import WalletConnect from "@/context/WalletConnect";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <WalletConnect>
      <Component {...pageProps} />
    </WalletConnect>
  );
}
