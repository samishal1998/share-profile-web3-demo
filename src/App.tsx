import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, useAccount, useBalance, usePrepareSendTransaction, useSendTransaction, WagmiConfig } from 'wagmi'
import {
  mainnet,
  goerli,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
} from 'wagmi/chains'
import { Chain } from '@wagmi/core'
import { BigNumber, ethers } from 'ethers';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProfilePage } from './pages/profile';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const router = createBrowserRouter([
  {
    path: '/profile/:id?',
    element: <ProfilePage></ProfilePage>
  }
])


const sepolia = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    infura: {
      http: ["https://sepolia.infura.io/v3"],
      webSocket: ["wss://sepolia.infura.io/ws/v3"],
    },
    default: {
      http: ['https://rpc2.sepolia.org']
    },
    public: {
      http: ['https://rpc2.sepolia.org']
    }
  }
} satisfies Chain


const chains = [mainnet, sepolia,
  polygon,
  avalanche,
  goerli,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom]


//Wallet Connect Project Key
const projectId = '8c49b47e54cef09076b92c2bae46bc8a'


const { provider } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains, }),
  provider,
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function App() {

  return (
    <ThemeProvider theme={materialTheme()}>
      <WagmiConfig client={wagmiClient}>
        <RouterProvider router={router}/>

      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ThemeProvider>
  )
}

function materialTheme(){
  return createTheme(
    {
       palette:{
        mode:"dark"
       },
       shape:{
        borderRadius:16,
       },

      },
      
  );
}

export default App;
// Transaction: {"hash":"0x1e9e038060035feeb62377bc60ca041af6a99ec684a043ad7da9df4d9805f982"}
