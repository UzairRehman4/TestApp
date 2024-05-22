"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { db, storage } from '@/app/config/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Container } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CheckInList from './CheckInList';
import Image from "next/image";
import hero from "../../../public/Images/hero.jpeg";

interface CheckIn {
    id: string;
    name: string;
    date: string;
    owner: string;
    imageUrl: string;
}

const CheckInFunctionality: React.FC = () => {
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
    const [newCheckIn, setNewCheckIn] = useState<Omit<CheckIn, 'id'>>({ name: '', date: '', owner: '', imageUrl: '' });
    const [open, setOpen] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const fetchCheckIns = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'checkins'));
            const checkInsList: CheckIn[] = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as CheckIn);
            setCheckIns(checkInsList);
        } catch (error) {
            console.error('Error fetching check-ins: ', error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error fetching check-ins');
        }
    }, []);

    useEffect(() => {
        fetchCheckIns();
    }, [fetchCheckIns]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCheckIn(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (imageFile) {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                uploadTask.on('state_changed',
                    null,
                    (error) => {
                        console.error('Error uploading image: ', error);
                        setSnackbarOpen(true);
                        setSnackbarMessage('Error uploading image');
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            await addCheckIn(downloadURL);
                        } catch (error) {
                            console.error('Error getting download URL: ', error);
                            setSnackbarOpen(true);
                            setSnackbarMessage('Error getting download URL');
                        }
                    }
                );
            } else {
                console.error('No image file selected');
            }

            setNewCheckIn({ name: '', date: '', owner: '', imageUrl: '' });
            setImageFile(null);
            setOpen(false);
        } catch (error) {
            console.error('Error adding document: ', error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error adding check-in');
        }
    };

    const addCheckIn = async (imageUrl: string) => {
        try {
            const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            await addDoc(collection(db, 'checkins'), {
                ...newCheckIn,
                date,
                imageUrl,
            });
            setSnackbarOpen(true);
            setSnackbarMessage('Check-in added successfully!');
            await fetchCheckIns();
        } catch (error) {
            console.error('Error adding document: ', error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error adding check-in');
        }
    };

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, 'checkins', id));
            setSnackbarOpen(true);
            setSnackbarMessage('Check-in deleted successfully!');
            await fetchCheckIns();
        } catch (error) {
            console.error('Error deleting document: ', error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error deleting check-in');
        }
    }, [fetchCheckIns]);

    const handleSnackbarClose = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    return (
        <>
            <Container>
                <Box mt={4} sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        src={hero}
                        alt="Cover"
                        className="object-cover "
                        quality={100}
                    />
                    <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                        <Typography variant="h5" color="white" fontWeight="bold">Hi! Uzair Rehman</Typography>
                        <Typography variant="body1" color="white">This is sample checkin App</Typography>
                        <Button onClick={() => setOpen(true)} variant="contained" sx={{ mt: 6, backgroundColor: "#7B5AFF", borderRadius: "30px", fontSize: "13px" }}>Add Check In</Button>
                    </Box>
                </Box>
                <CheckInList
                    checkIns={checkIns}
                    handleDelete={handleDelete}
                />
            </Container>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Check-In</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={newCheckIn.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="image-upload"
                        />
                        <label htmlFor="image-upload">
                            <Button component="span" variant="outlined" color="primary">
                                Upload Image
                            </Button>
                        </label>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};

export default CheckInFunctionality;
