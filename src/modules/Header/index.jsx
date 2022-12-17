import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import axiosWrapper from '../../apis/axiosCreate';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    var sessionId=window.localStorage.getItem('sessionId');
    await axiosWrapper
      .delete(`/Customer/destroySession/`+sessionId)
      .then((res) => console.log('logged out'))
      .then(window.localStorage.clear())
      .then((res) => navigate('/login'))
      .catch((err) => console.error('Error in logout'));
  }
  const handleProfile = () => {
    navigate('/userProfile')
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}><img style={{width: '150px'}} src='https://firebasestorage.googleapis.com/v0/b/water-track-337ea.appspot.com/o/speedkart%2Fspeedkart-logo.png?alt=media&token=81c4ca4e-3dff-46cb-8edd-d7a179ed0835'/></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <BiUserCircle size={30} color="white" 
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
          {/* <span>Mark Otto</span> */}
          {/* </Container> */}
        </Navbar.Collapse>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/orders')}>
          My Orders
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut}>
          Logout
        </MenuItem>
      </Menu>
    </Navbar>
  );
};
