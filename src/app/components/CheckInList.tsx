import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CheckInCard from './CheckInCard';

interface CheckIn {
    id: string;
    name: string;
    date: string;
    owner: string;
    imageUrl: string;
}

interface CheckInListProps {
    checkIns: CheckIn[];
    handleDelete: (id: string) => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const CheckInList: React.FC<CheckInListProps> = ({ checkIns, handleDelete }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Added Check-Ins
            </Typography>
            <Grid container spacing={2} mt={4}>
                {checkIns.map((checkIn) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={checkIn.id}>
                        <CheckInCard
                            name={checkIn.name}
                            date={formatDate(checkIn.date)}
                            owner={checkIn.owner}
                            imageUrl={checkIn.imageUrl}
                            onDelete={() => handleDelete(checkIn.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CheckInList;
