import React from "react";
import { Card, Typography, Button, Avatar, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UsersCard = ({ user, handleDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      // Call the delete handler passed from parent
      await handleDelete(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
      <Card
        sx={{
          textAlign: "center",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "0.3s",
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.first_name}
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            border: "5px solid #007BFF",
            transition: "0.3s",
          }}
          loading="lazy"
        />

        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            mt: 2,
            color: "#222",
          }}
        >
          {user.first_name} {user.last_name}
        </Typography>

        <Tooltip title={user.email} arrow>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins",
              color: "#555",
              mt: 1,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { color: "#007BFF" },
            }}
          >
            {user.email.length > 20 ? user.email.slice(0, 20) + "..." : user.email}
          </Typography>
        </Tooltip>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              transition: "0.3s",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#007BFF",
                color: "#fff",
              },
            }}
            onClick={() => navigate(`/edit/${user.id}`)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              transition: "0.3s",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#D32F2F",
                boxShadow: "5px 5px 15px rgba(211, 47, 47, 0.3)",
              },
            }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default UsersCard;