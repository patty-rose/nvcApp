import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default function Footer() {
  return (
    <Paper
      sx={{
        backgroundImage:
          "linear-gradient(to right, #0f1b4c, #0f1b4c,  #0f1b4c, #2c7399, #0f1b4c)",
        marginTop: "calc(10% + 60px)",
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <QuestionAnswerIcon size="large" sx={{ color: "white" }} />
            <Typography
              color="white"
              variant="h4"
              sx={{
                ml: 2,
              }}
            >
              Venter
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="white">
            Copyright ©2022. Patty Otero oteropatty@gmail.com
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
