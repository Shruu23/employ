import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";
import { motion } from "framer-motion";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#E3F2FD" },
            },
            "& .Mui-selected": {
              backgroundColor: "#007FFF !important",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#0059B2 !important" },
            },
          }}
        />
      </motion.div>
    </Stack>
  );
};

export default Pagination;
