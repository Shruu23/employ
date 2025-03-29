import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateUser } from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/poppins";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState(state?.user || null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(!state?.user);
  const [sourcePage, setSourcePage] = useState(state?.sourcePage || 1);

  useEffect(() => {
    if (!state?.user) {
      const loadUser = async () => {
        try {
          setLoading(true);
          // Search through all pages to find the user
          let foundUser = null;
          let currentPage = 1;
          
          while (!foundUser && currentPage <= 3) {
            const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
            const data = await response.json();
            foundUser = data.data.find(u => u.id.toString() === id);
            if (foundUser) {
              setSourcePage(currentPage); // Store the page where user was found
            }
            currentPage++;
          }

          if (foundUser) {
            setUser(foundUser);
          } else {
            setError("User not found");
          }
        } catch (err) {
          setError("Failed to load user data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    } else if (state?.sourcePage) {
      setSourcePage(state.sourcePage);
    }
  }, [id, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.first_name?.trim() || !user?.last_name?.trim() || !user?.email?.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      // Note: reqres.in is a mock API - updates won't persist
      await updateUser(id, user);
      setSuccess("User updated successfully!");
      
      // Navigate back to the source page after 1.5 seconds
      setTimeout(() => {
        navigate(`/users?page=${sourcePage}`, { 
          state: { 
            userUpdated: true,
            updatedUser: user 
          } 
        });
      }, 1500);
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  if (loading && !user) {
    return (
      <Box 
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <CircularProgress sx={{ color: "white" }} size={60} />
        </motion.div>
      </Box>
    );
  }

  if (!user && !loading) {
    return (
      <Box 
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <Typography variant="h4" sx={{ color: "white", fontFamily: "Poppins" }}>
            User not found
          </Typography>
        </motion.div>
      </Box>
    );
  }

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
        <AnimatePresence>
          <motion.div
            key={user?.id || "edit-form"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                position: "relative",
                overflow: "hidden",
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
              {/* Avatar with animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 3,
                    border: "4px solid #667eea",
                    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                  }}
                />
              </motion.div>

              {/* Title with animation */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    mb: 3,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                  }}
                >
                  Edit Profile
                </Typography>
              </motion.div>

              <form onSubmit={handleSubmit}>
                {/* Form fields with staggered animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography align="left" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
                     First Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="First Name"
                      name="first_name"
                      value={user.first_name || ""}
                      onChange={handleChange}
                      margin="normal"
                      disabled={loading}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "rgba(255,255,255,0.9)",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Typography align="left" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Last Name"
                      name="last_name"
                      value={user.last_name || ""}
                      onChange={handleChange}
                      margin="normal"
                      disabled={loading}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "rgba(255,255,255,0.9)",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Typography align="left" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
                       Email
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={user.email || ""}
                      onChange={handleChange}
                      margin="normal"
                      disabled={loading}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "rgba(255,255,255,0.9)",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                        },
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Save button with hover animation */}
                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <CircularProgress size={24} color="inherit" />
                        </motion.div>
                      ) : (
                        <EditIcon />
                      )
                    }
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
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </motion.div>
              </form>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Animated Snackbars */}
        <AnimatePresence>
          {error && (
            <Snackbar
              open={!!error}
              autoHideDuration={6000}
              onClose={() => setError(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert
                  severity="error"
                  onClose={() => setError(null)}
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(220, 53, 69, 0.3)",
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            </Snackbar>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <Snackbar
              open={!!success}
              autoHideDuration={3000}
              onClose={() => setSuccess(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert
                  severity="success"
                  onClose={() => setSuccess(null)}
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(25, 135, 84, 0.3)",
                  }}
                >
                  {success}
                </Alert>
              </motion.div>
            </Snackbar>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default EditUser;