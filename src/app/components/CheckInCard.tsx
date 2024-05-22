import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface CheckInCardProps {
  name: string;
  date: string;
  owner: string;
  imageUrl: string;
  onDelete: () => void;
}

const CheckInCard: React.FC<CheckInCardProps> = ({ name, date, owner, imageUrl, onDelete }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={`${name}'s check-in`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Owner: {owner}
        </Typography> */}
        <Button onClick={onDelete} variant="contained" sx={{ mt: 2, backgroundColor: "black" }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CheckInCard;
