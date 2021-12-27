import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Grid, TextField } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useWeb3React } from "@web3-react/core"
import { conMetaMask, userBalance } from "../web3/connect";
import { typography } from '@mui/system';
import { getSortedPostsData } from '../lib/posts'
const useHome = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [walletConnecter, setWalletConnecter] = React.useState(null);
  const [userAddress, setUserAddress] = React.useState('');
  const [isConnect, setIsConnect] = React.useState(false);
  const [balance, setBalance] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const connectMetaMask = async () => {
    const address = await conMetaMask();
    setIsConnect(true);
    console.log(address);
    setUserAddress(address);
    const x = await userBalance(address);
    setBalance(x);
    closeModal();
  }
  const disConnectWallet = async () => {
    setIsConnect(false);
  }
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return { connectMetaMask, openModal, closeModal, isOpen, disConnectWallet, isConnect, balance, userAddress };
}
export default function Home({ allPostsData }) {
  const { connectMetaMask, openModal, closeModal, isOpen, disConnectWallet, isConnect, balance, userAddress } = useHome();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };
  const receiver = 'IT';
  const [tokenValue, setTokenValue] = React.useState('');
  return (
    <div className="container">
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container>
            <Typography variant="h4" align="center">
              Connect Wallet
            </Typography>
            <Grid item xs={12} style={{ marginTop: '10px' }} >
              <Button variant="outlined" onClick={connectMetaMask} color="primary" startIcon={<img src="images/metamask.png" width="30" />}>
                MetaMask
              </Button>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={openModal} color="secondary" startIcon={<img src="images/walletconnect.png" width="30" />}>
                WalletConnect
              </Button>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={openModal} startIcon={<img src="images/trustwallet.png" width="30" />}>
                TrustWallet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link href="/claim">
          <Button size="small" >WEB3</Button>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {userAddress ? userAddress : `Web3 Learning`}
        </Typography>
        {
          !isConnect ? (
            <Button variant="outlined" size="small" onClick={openModal}>
              Connect Wallet
            </Button>

          ) : (
            <Button variant="outlined" size="small" onClick={disConnectWallet}>
              Disconnect
            </Button>

          )
        }
      </Toolbar>
      <Box xs={12}>
        <Typography>{balance ? balance : 'No balance'}</Typography>
      </Box>
      <Box xs={12}>
        <Grid container style={{ alignItems: 'center', justifyContent: 'center' }} spacing={3}>
          <Grid item xs={2}>
            <Typography>Send Some Tokens</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField label="To" value={receiver} variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Value" variant="outlined" value={tokenValue} onChange={e => setTokenValue(e.target.value)} fullWidth />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </Box>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}