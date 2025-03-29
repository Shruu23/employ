import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  InputAdornment,
  Divider,
  Alert,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/poppins";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
              p: { xs: 3, sm: 4 },
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              overflow: "hidden",
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
              },
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Lock sx={{ 
                fontSize: 60, 
                color: "white", 
                mb: 2,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
              }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  color: "white",
                  fontFamily: "Poppins",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "rgba(255,255,255,0.8)",
                  mt: 1,
                  fontFamily: "Poppins"
                }}
              >
                Please enter your credentials to login
              </Typography>
            </Box>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(220, 53, 69, 0.2)"
                    }}
                    onClose={() => setError("")}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <Box component="form" sx={{ mb: 3 }}>
              <Typography align="left" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email" 
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "rgba(102, 126, 234, 0.8)" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography align="left" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
                Password
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your password" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "rgba(102, 126, 234, 0.8)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "rgba(102, 126, 234, 0.8)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                    "&.Mui-disabled": {
                      background: "rgba(255,255,255,0.3)",
                      color: "rgba(255,255,255,0.7)",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />

            
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;