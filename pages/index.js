import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useWeb3React } from "@web3-react/core"
import { conMetaMask } from "../web3/connect";
const useHome = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [isConnect, setIsConnect] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const connectMetaMask = async () => {
    const address = await conMetaMask();
    setIsConnect(true);
    console.log(address);
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
  return { connectMetaMask, openModal, closeModal, isOpen, disConnectWallet, isConnect };
}
export default function Home() {
  const { connectMetaMask, openModal, closeModal, isOpen, disConnectWallet, isConnect } = useHome();
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
        <Button size="small">WEB3</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Web3 Learning
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
