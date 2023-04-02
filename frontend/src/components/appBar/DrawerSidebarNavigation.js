import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EmailIcon from '@mui/icons-material/Email';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 260;

const topMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Add New User', icon: <PersonAddAlt1Icon /> },
    { text: 'Add New Ticket', icon: <PostAddIcon /> },
    { text: 'Send Email', icon: <EmailIcon /> },    
  ];
  
  const bottomMenuItems = [
        
    { text: 'View Tickets', icon: <ListAltIcon /> },
    { text: 'VIew Users', icon: <PersonIcon /> },
    { text: 'Generate Report', icon: <SummarizeIcon /> },    
    { text: 'Logout', icon: <LogoutIcon /> },
  ];
  

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DrawerSidebarNavigation({children, onAddTicket, onLogout}) {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('Inbox');

  // DRAWER FUNCTIONS

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // FUNCTIONS
  const handleItemClick = (text) => {

    setSelectedItem(text);

    if (text === 'Add New Ticket') {
      onAddTicket();
      return;
    }
    if (text === 'Logout') {
      onLogout();
      return;
    }            
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='bg-dark'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* TODO: SHOULD CHANGE EVERYTIME THE USER SELECT IN THE DRAWER */}
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className='d-flex'
        sx={{            
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >    
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {topMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                <ListItemButton
                    // selected={item.text === selectedItem}
                    onClick={() => handleItemClick(item.text)}
                    sx={{
                    backgroundColor: item.text === selectedItem ? 'rgba(23, 48, 88, 0.1)' : 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, .1)',
                    },
                    }}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {bottomMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                <ListItemButton
                    selected={item.text === selectedItem}
                    onClick={() => handleItemClick(item.text)}
                    sx={{
                    backgroundColor: item.text === selectedItem ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    }}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
                </ListItem>
            ))}
        </List>
        <div className='d-flex flex-column mt-auto pt-4'>
        <img
              className='d-flex mx-auto mb-4'
              src="/appLogoBlack.png"
              alt="App Logo"
              style={{ width: '6em', height: '6em' }}
            />
        <p className='mx-auto text-decoration-none text-black small'>© Team Seven</p>
        </div>
      </Drawer>
      <Main open={open}>                
        <DrawerHeader />
        {children}        
      </Main>      
    </Box>
  );
}