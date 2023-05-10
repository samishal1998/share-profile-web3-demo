
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, useAccount, useBalance, useContractRead, usePrepareSendTransaction, useSendTransaction, WagmiConfig } from 'wagmi'

import { BigNumber, ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import accounts from '../contracts/Accounts.json'

export function ProfilePage() {
    const { id } = useParams()
    const account = useAccount()
    const balance = useBalance({ address: account.address, 'suspense': !account.address })


    const { data, isLoading, isSuccess, } = useContractRead(
        {
            abi: accounts.abi,
            address: accounts.networks['11155111'].address as any,
            chainId: 11155111, functionName: 'getAccount', args: [id],
            enabled: !!(id && account.address),
            overrides: { from: account.address }
        })

    const [handle, name, subtitle, owner, profileImage, links] = (data as any) ?? []

    return (
        <main className="App">
            
            <div style={{ display: 'flex', position: 'absolute', bottom: '1rem', right: '1rem', flexDirection: "column", justifyContent: 'center', alignItems: 'center', gap: '.5rem' }}>

                <Web3Button icon="show" label="Connect Wallet" balance="show" />

                <Web3NetworkSwitch />


            </div>


            <div>
                {/* <p>
                User Address: {(account.address)}
            </p>
            <p>

    const { config } = usePrepareSendTransaction({
        request: { to: '0x706a1415bc5ea0576B5a93bEe633F87E62CA759A', value: BigNumber.from('50000000000000000') },
    })
    // const { data, isLoading, isSuccess, sendTransaction } =
    //     useSendTransaction(config)
                User Balance: {(balance.data?.formatted)} ETH
            </p> */}
                {/* <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
                    Send Transaction
                </button> */}
                {/* {isLoading && <div>Check Wallet</div>} */}
                {isSuccess &&

                    <Box py={5} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'stretch'} maxWidth={420} mx={'auto'} >
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                            <Avatar src={`https://ipfs.io/ipfs/${profileImage}`} sx={{ width: 224, height: 224 }}
                            />
                            <Typography variant='h5'>{name}</Typography>
                            <Typography variant='body1'>{subtitle}</Typography>
                            <Typography variant='subtitle2'>@{handle}</Typography>
                            <Typography variant='subtitle2'>{owner}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'stretch'}>


                            <List sx={{ width: '100%', }}>
                                {links.map((link: any) => {
                                    // console.log({link})
                                    if (link['enabled'])
                                        return <LinkRow link={link} />

                                })}

                            </List>

                        </Box>
                    </Box>


                }
            </div>

        </main>
    );

}

function LinkRow({ link }: any) {

    const { label, url, thumbnail } = link;

    return (
        <ListItem component={'a'} href={url} sx={{ color: 'white', borderRadius: '1rem', border: '1px solid white', my: 1, ':hover': { bgcolor: 'black' } }}>
            <ListItemAvatar>
                <Avatar src={`https://ipfs.io/ipfs/${thumbnail}`} />
            </ListItemAvatar>
            <ListItemText primary={label} />
        </ListItem>

    )

}