//Components are independent and reusable bits of code
//They serve the same purpose as JS functions
//But work in isolation and return HTML

import { useMoralis } from "react-moralis"
import { useEffect } from "react"

//Modularize and reuse the header component
export default function Header() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()
    // Hooks automatically re-render when something changes
    //FOR NOW METAMASK-ONLY

    // Hook ^^
    //Hooks let you "hook into" React state and lifecycle features
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                // SO IT WAS SO THAT WE DON'T HAVE TO CLICK "CONNECT"
                // EVERY TIME WE REFRESH
            }
        }
        //Basically do nothing and end
        // enableWeb3()
    }, [isWeb3Enabled])

    //IF ANYTHING IN THE ARRAY OF DEPENDENCIES (OPTIONAL)
    //IT WILL RUN THE FUNCTION AND RE-RENDER THE PAGE

    // 1-- no dependency array: run anytime something re-renders
    // CAREFUL with this!! Cuz you can get circular renders

    // 2-- Blank dependency array, it will run once on load

    // 3-- There IS something there, it will run anytime something changes

    //Let's first of all check if the user is connected before rendering

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                //which will turn IsWeb3Enabled to false
                console.log("Null Account found!")
            }
        })
    }, [])
    // We want to see if we disconnected and no longer ask for that

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        //We want to store somewhere that we recently connected
                        //Some versions of NextJs Have a hard time knowing about window
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                        // Maybe in future we want to say: walletConnect or CoinbaseWallet
                        // injected == metamask
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
