import React, { useState, useEffect } from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { Typography, Grid, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

export default function Booking({ selectedBarbers, onAddDateToCart }) {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [shifts, setShifts] = useState([]);
    const [userShifts, setUserShifts] = useState([]);
    const [selectedHourId, setSelectedHourId] = useState(null);
    const [reservations, setReservations] = useState([]);

    const futureDates = Array.from({ length: 8 }, (_, index) => addDays(today, index));

    const baseURL = "http://localhost:8080";

    useEffect(() => {
        const user_id = selectedBarbers.length > 0 ? selectedBarbers[0].user_id : null;

        if (user_id) {
            axios.get(`${baseURL}/shifts?user_id=${user_id}`)
                .then(response => {
                    setShifts(response.data);
                })
                .catch(error => console.error('Error fetching shifts:', error));
        }
    }, [selectedBarbers]);


    useEffect(() => {
        const user_id = selectedBarbers.length > 0 ? selectedBarbers[0].user_id : null;

        if (user_id) {
            axios.get(`${baseURL}/reservations?user_id=${user_id}`)
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => console.error('Error fetching reservations:', error));
        }
    }, [selectedBarbers]);



    const getUserShifts = (user_id, day_of_week) => {
        return shifts.filter(shift => shift.user_id === user_id && shift.day_of_week === day_of_week);
    };

    useEffect(() => {
        const dayOfWeek = format(selectedDate, 'EEEE');
        const user_id = selectedBarbers.length > 0 ? selectedBarbers[0].user_id : null;
        const shiftsForDate = getUserShifts(user_id, dayOfWeek);
        setUserShifts(shiftsForDate);
    }, [selectedDate, selectedBarbers]);


    const generateHourArray = (start, end, step = 10, date) => {
        const startTime = new Date(`2022-01-01 ${start}`);
        const endTime = new Date(`2022-01-01 ${end}`);
        const hoursArray = [];
        let currentTime = startTime;
        const disabledHoursSet = new Set(); // Set to track disabled hours

        while (currentTime <= endTime) {
            const formattedHour = format(currentTime, 'HH:mm');
            const currentDateTime = new Date(date);
            const reservationDateTime = format(new Date(`${format(currentDateTime, 'yyyy-MM-dd')} ${formattedHour}`), 'yyyy-MM-dd HH:mm');
            const isReserved = reservations.some(reservation => {
                const reservationDateTimeFormatted = format(new Date(reservation.apointment_time), 'yyyy-MM-dd HH:mm');
                return reservationDateTimeFormatted === reservationDateTime;
            });

            const reservationIndex = reservations.findIndex(reservation => {
                const reservationDateTimeFormatted = format(new Date(reservation.apointment_time), 'yyyy-MM-dd HH:mm');
                return reservationDateTimeFormatted === reservationDateTime;
            });

            if (reservationIndex !== -1) {
                const duration = parseInt(reservations[reservationIndex].duration, 10);

                for (let i = 0; i <= duration / 10; i++) {
                    const nextSlotTime = addMinutes(currentTime, i * 10);
                    const nextSlotFormattedHour = format(nextSlotTime, 'HH:mm');

                    if (!disabledHoursSet.has(nextSlotFormattedHour)) {
                        hoursArray.push({
                            id: nextSlotFormattedHour,
                            hour: nextSlotFormattedHour,
                            date: format(currentDateTime, 'yyyy-MM-dd'),
                            disabled: true,
                        });

                        disabledHoursSet.add(nextSlotFormattedHour);
                    }
                }
            } else if (!disabledHoursSet.has(formattedHour)) {
                hoursArray.push({
                    id: formattedHour,
                    hour: formattedHour,
                    date: format(currentDateTime, 'yyyy-MM-dd'),
                    disabled: isReserved,
                });

                disabledHoursSet.add(formattedHour);
            }

            currentTime.setMinutes(currentTime.getMinutes() + step);
        }

        return hoursArray;
    };



    const addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60000);
    };

    const handleHourClick = (hourId, shiftIndex, date) => {
        const isReserved = isTimeReserved(date, hourId);

        if (!isReserved) {
            onAddDateToCart(hourId, shiftIndex, date);
            setSelectedHourId(hourId);
        } else {
            console.log('This time is already reserved.');
        }
    };

    const isWeekend = (date) => {
        const dayOfWeek = format(date, 'EEEE');
        return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
    };

    const isTimeReserved = (date, time) => {
        const reservationDateTime = format(new Date(`${date} ${time}`), 'yyyy-MM-dd HH:mm');
        return reservations.some(reservation => {
            const reservationDateTimeFormatted = format(new Date(reservation.apointment_time), 'yyyy-MM-dd HH:mm');
            return reservationDateTimeFormatted === reservationDateTime;
        });
    };


    return (
        <React.Fragment>
            <Typography variant="h6" sx={{ mb: 1, mt: 1 }}>
                {format(today, 'MMMM yyyy')}
            </Typography>
            <Grid container spacing={4}>
                {futureDates.map((date, index) => (
                    <Grid key={index} item>
                        <Button
                            disableRipple
                            onClick={() => setSelectedDate(date)}
                            disabled={isWeekend(date)}
                            sx={{
                                borderRadius: '50%',
                                padding: 2,
                                backgroundColor: isSameDay(date, selectedDate) ? '#6f00ff' : 'transparent',
                                color: isSameDay(date, selectedDate) ? 'white' : 'black',
                                '&:hover': {
                                    backgroundColor: '#F1F1F1',
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: isWeekend(date) && isSameDay(date, selectedDate) ? '#6f00ff' : isWeekend(date) ? '#ccc' : 'inherit',
                                }}
                            >
                                {format(date, 'd')}
                            </Typography>
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: 'center',
                                cursor: 'default',
                                color: isWeekend(date) ? '#ccc' : 'inherit',
                            }}
                        >
                            {format(date, 'EEE')}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid
                sx={{
                    mt: 2,
                    padding: '10px',
                    maxHeight: '620px',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                {userShifts.map((shift, shiftIndex) => (
                    <Grid key={shiftIndex} container>
                        {generateHourArray(shift.start_time, shift.end_time, 10, selectedDate).map((hour, hourIndex) => (
                            <Button
                                key={hourIndex}
                                onClick={() => handleHourClick(hour.id, shiftIndex, hour.date)}
                                disableRipple
                                disabled={hour.disabled}
                                sx={{
                                    borderRadius: 0,
                                    margin: 0,
                                    padding: 0,
                                    '&:hover': {
                                        backgroundColor: hour.disabled ? '#ccc' : 'rgba(255, 255, 255, 1)',
                                    },
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        p: 2,
                                        mb: 2,
                                        mt: 2,
                                        height: 'auto',
                                        width: '700px',
                                        color: hour.disabled ? '#ccc' : 'black',

                                        border: hour.id === selectedHourId ? '2px solid #6f00ff' : 'none',
                                    }}
                                >
                                    <Box sx={{ textTransform: 'capitalize' }}>
                                        <Typography variant="body1">
                                            {hour.hour}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Button>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
