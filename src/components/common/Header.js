import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const Header = () => {
    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon onClick={()=>{navigate("/")}} />
          </IconButton>
            <Button color="inherit" onClick={()=>{navigate("/posts")}}>Posts</Button>
            <Button color="inherit" onClick={()=>{navigate("/todos")}}>ToDos</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default  Header;