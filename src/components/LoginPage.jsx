import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import img from '/img.avif';
import { auth } from '../config/firebase'; // Corrected import
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Optionally handle the remember me functionality
        if (rememberMe) {
          localStorage.setItem('rememberMe', true);
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('email');
        }
        alert('Login successful');
        navigate('/');
        localStorage.setItem("isLoggedIn",true)
      })
      .catch((error) => {
        setError(error.message);  // Set error message for display
      });
  };

  return (
    <Grid container sx={{ height: "fit-content" }}>
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          backgroundColor: 'white', 
          display: { xs: 'none', md: 'flex' },  
          alignItems: 'center', 
          justifyContent: 'flex-start',  
          flexDirection: 'column',
          padding: 3 
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: 25, marginTop: 8, marginRight: 10, marginLeft: 10 }} gutterBottom>
        <p > WELCOME TO LEARNING <hr /></p><p>MANAGEMENT SYSTEM <hr /></p>
        </Typography>
        <img src={img} alt="LMS" style={{ width: '100%', maxWidth: '100%', height: '100%' }} />
      </Grid>
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: 'flex',
          backgroundColor: 'whitesmoke', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column', 
          padding: 3 
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Typography variant="h5" gutterBottom align="center">
            <h3>
            LOGIN
            </h3>
          </Typography>
          
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error && !email)}
            helperText={error && !email ? 'Email is required' : ''}
          />
          
          <TextField 
            label="Password" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'} 
            fullWidth 
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error && !password)}
            helperText={error && !password ? 'Password is required' : ''}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
            label="Remember me"
          />

          <Button 
            variant="contained" 
            color="success" 
            fullWidth 
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Typography align="center" sx={{ marginTop: 2, fontSize: 20, color: 'green' }}>
            Or <NavLink to="/signup" style={{ color: 'green' }}> <br />Sign up</NavLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;