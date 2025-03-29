import React, { } from "react";
import { AppBar, Toolbar, Typography, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { motion } from "framer-motion";
import "@fontsource/poppins";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
        boxShadow: "0 4px 20px rgba(79, 70, 229, 0.3)",
        padding: "8px 0",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        px: { xs: 2, sm: 4 }
      }}>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins",
              letterSpacing: "1px",
              color: "#fff",
              cursor: "pointer",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 1
            }} 
            onClick={() => navigate("/")}
          >
            <Box 
              component="span" 
              sx={{
                display: "inline-block",
                width: 10,
                height: 10,
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)"
              }}
            />
            EmployWise
          </Typography>
        </motion.div>

        <TextField 
          placeholder="Search Users..." 
          variant="outlined" 
          size="small" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          sx={{
            width: { xs: "40%", sm: "30%" },
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.8)",
              },
            },
          }}
          InputProps={{
            sx: {
              color: "#2d3748",
              "&::placeholder": {
                color: "#718096",
                opacity: 1
              }
            }
          }}
        />

        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="contained" 
            startIcon={<Logout sx={{ color: "#fff" }} />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#fff",
              borderRadius: "8px",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              },
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(5px)",
              textTransform: "none",
              fontWeight: "600",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            Logout
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;