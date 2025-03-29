import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Grid, 
  Card, 
  Typography, 
  Button, 
  Avatar, 
  IconButton,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import "@fontsource/poppins";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const totalPages = 3;

  // Load paginated users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(page);
        setUsers(data.data);
        setDisplayUsers(data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  // Handle search
  useEffect(() => {
    if (search.trim() === "") {
      setIsSearching(false);
      setDisplayUsers(users);
      return;
    }

    const searchAcrossPages = async () => {
      setIsSearching(true);
      try {
        setLoading(true);
        const pagesToFetch = 3;
        const allData = [];
        
        for (let page = 1; page <= pagesToFetch; page++) {
          const response = await fetchUsers(page);
          allData.push(...response.data);
        }
        
        const filtered = allData.filter(user =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
        );
        setAllUsers(allData);
        setDisplayUsers(filtered);
        setError(null);
      } catch (err) {
        setError("Search failed. Please try again.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      searchAcrossPages();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, users]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setAllUsers(allUsers.filter((user) => user.id !== id));
      if (isSearching) {
        setDisplayUsers(displayUsers.filter((user) => user.id !== id));
      }
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      pb: 6
    }}>
      <Navbar search={search} setSearch={setSearch} />
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{
            my: 4,
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "#2d3748",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
              margin: "16px auto 0",
              borderRadius: "2px"
            }
          }}
        >
          User Directory
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && displayUsers.length === 0 && (
          <Typography align="center" color="textSecondary">
            {isSearching ? "No matching users found" : "No users available"}
          </Typography>
        )}

        <Box sx={{ position: "relative", minHeight: "400px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Grid 
                container 
                spacing={4} 
                justifyContent="center"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {displayUsers.map((user) => (
                  <Grid item key={user.id}>
                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                      <Card
                        sx={{
                          textAlign: "center",
                          p: 3,
                          borderRadius: "16px",
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                          transition: "0.3s",
                          background: "white",
                          position: "relative",
                          border: "1px solid rgba(0,0,0,0.05)",
                          "&:hover": {
                            boxShadow: "0 10px 35px rgba(79, 70, 229, 0.15)",
                            borderColor: "rgba(79, 70, 229, 0.2)"
                          }
                        }}
                      >
                        <Avatar
                          src={user.avatar}
                          alt={user.first_name}
                          sx={{
                            width: 90,
                            height: 90,
                            margin: "auto",
                            border: "4px solid #4f46e5",
                            transition: "0.3s",
                            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            mt: 2,
                            color: "#2d3748",
                          }}
                        >
                          {user.first_name} {user.last_name}
                        </Typography>

                       

                        <Box sx={{ 
                          display: "flex", 
                          justifyContent: "center", 
                          gap: "10px", 
                          marginTop: "15px" 
                        }}>
                          
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ 
                                textTransform: "none", 
                                borderRadius: "8px", 
                                fontWeight: "bold",
                                color: "#4f46e5",
                                borderColor: "#4f46e5",
                                "&:hover": {
                                  backgroundColor: "rgba(79, 70, 229, 0.04)",
                                  borderColor: "#4f46e5"
                                }
                              }}
                              onClick={() => navigate(`/edit/${user.id}`, { 
                                state: { 
                                  user, 
                                  sourcePage: currentPage // Make sure to pass the current page number
                                } 
                              })}
                            >
                              Edit
                            </Button>
                          
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ 
                              textTransform: "none", 
                              borderRadius: "8px", 
                              fontWeight: "bold",
                              backgroundColor: "#ef4444",
                              "&:hover": {
                                backgroundColor: "#dc2626"
                              }
                            }}
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Show pagination only when not searching */}
        {!isSearching && !loading && (
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            marginTop: "30px", 
            alignItems: "center" 
          }}>
            <IconButton 
              onClick={() => handlePageChange(Math.max(page - 1, 1))} 
              disabled={page === 1}
              sx={{
                color: page === 1 ? "#cbd5e0" : "#4f46e5",
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.1)"
                }
              }}
            >
              <ChevronLeft fontSize="large" />
            </IconButton>

            <Typography sx={{ 
              fontSize: "1.2rem", 
              fontWeight: "bold", 
              mx: 2, 
              fontFamily: "Poppins", 
              color: "#2d3748" 
            }}>
              Page {page} of {totalPages}
            </Typography>

            <IconButton 
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))} 
              disabled={page === totalPages}
              sx={{
                color: page === totalPages ? "#cbd5e0" : "#4f46e5",
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.1)"
                }
              }}
            >
              <ChevronRight fontSize="large" />
            </IconButton>
          </Box>
        )}

        {/* Notification Snackbars */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!success}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            {success}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Users;