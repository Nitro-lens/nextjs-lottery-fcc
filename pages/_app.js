import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )

    //initializeOnMount is the feature to hook into a server
    //And get some more features, which we don't

    // Hooks allow function components to have access to state and othe rReact feautures
    // Because of this, class componenets are generally no longer needed
}

export default MyApp
