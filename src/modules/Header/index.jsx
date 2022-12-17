import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import axiosWrapper from '../../apis/axiosCreate';
// import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const navigate = useNavigate();
    const handleLogOut = async () => {
    var sessionId=window.localStorage.getItem('sessionId');
    await axiosWrapper
      .delete(`/Customer/destroySession/`+sessionId)
      .then((res) => console.log('logged out'))
      .then(window.localStorage.clear())
      // .then((res) => navigate('/login'))
      .catch((err) => console.error('Error in logout'));
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
        <Navbar.Brand href="#home">SpeedKart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Container className='header-profile-icon-container'> */}
          <BiUserCircle size={30} color="white" 
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
          {/* <span href="#login">Mark Otto</span> */}
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
        <MenuItem>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem>
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
