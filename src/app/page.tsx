
import { Container, Box, Typography, Button, Avatar } from '@mui/material';
import Header from '@/app/components/Header';
import CheckInFunctionality from "./components/checkInFunctionality";

export default function Home() {
  return (
    <>
      <Container className='mb-20'>
        <Header />
        <CheckInFunctionality />
      </Container>
    </>
  );
}
