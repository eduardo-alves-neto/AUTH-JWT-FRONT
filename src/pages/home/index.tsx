import { Container, Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <Container>
      <Typography variant="h2">Home Page</Typography>
      <Typography variant="body1">
        This is a private page only accessible to authenticated users.
      </Typography>
    </Container>
  );
};
