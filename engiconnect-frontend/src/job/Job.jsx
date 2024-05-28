import React, { useState, useContext, useEffect } from 'react';
import {
    Container, Grid, Card, CardHeader, FormControl, MenuItem, InputLabel, CardContent, CardActions, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Select, RadioGroup, Radio, FormControlLabel, Typography
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../css/GlobalStyle.css"
import { Box } from '@mui/material';
import UserContext from "../profile/UserContext.jsx";
import SearchUserAvatar from '../shared/SearchUserAvatar.jsx';
import '../css/BackgroundCard.css'


function Job() {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobs, setJobs] = useState([]);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [salary, setSalary] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [seniorityLevel, setSeniorityLevel] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [currency, setCurrency] = useState('');
    const [appliedJobs, setAppliedJobs] = useState({});

    const jobTitles = [
        { label: 'Software Engineeeeeeer', value: 'Software Engineeeeeeeeer' },
        { label: 'Data Scientist', value: 'Data Scientist' },
        { label: 'Product Manager', value: 'Product Manager' },
    ];

    const userContext = useContext(UserContext);
    const currentUserData = userContext.currentUserData;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const response = await fetch('/api/jobs/get-job');
        const data = await response.json();
        console.log('Fetched jobs:', data);
        setJobs(data);
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
        setDescription('');
        setCity('');
        setState('');
        setSalary('');
        setVacancies('');
        setSeniorityLevel('');
        setEmploymentType('')
        setCurrency('')
    };

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleCityChange = (event) => setCity(event.target.value);
    const handleStateChange = (event) => setState(event.target.value);
    const handleSalaryChange = (event) => setSalary(event.target.value);
    const handleVacanciesChange = (event) => setVacancies(event.target.value);
    const handleSeniorityLevelChange = (event) => setSeniorityLevel(event.target.value);
    const handleEmploymentTypeChange = (event) => setEmploymentType(event.target.value);
    const handleCurrencyRelease = (event) => setCurrency(event.target.value);

    const handleSubmit = async () => {
        const jobData = {
            title,
            description,
            city,
            state,
            salary,
            vacancies,
            seniorityLevel,
            employmentType,
            currency,
            userId: currentUserData.id
        };

        try {
            const response = await fetch('/api/jobs/post-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });

            if (!response.ok) throw new Error('Failed to submit job');

            handleClose();
            fetchJobs();
        } catch (error) {
            console.error('Failed to submit job:', error);
        }
    };

    const handleApply = async (jobId) => {
        const applicationData = {
            jobId: jobId,
            userId: currentUserData.id
        };

        try {
            const response = await fetch('/api/jobs/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationData)
            });

            if (!response.ok) {
                throw new Error('Failed to apply for job');
            }

            const responseData = await response.json();
            setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
            alert('Application successful! A confirmation email has been sent.');
        } catch (error) {
            console.error('Failed to apply for job:', error);
            alert('Failed to apply for job.');
        }

    };

    return (

        <Container maxWidth="100%" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }} >

            <Grid item style={{ padding: '50px', paddingRight: '110px', maxWidth: 'fit-content', flexGrow: 0 }}>

            </Grid>

            <Box justifyContent="center" alignItems="center" className="card-background" sx={{
                marginTop: 2,
                border: '2px solid #ccc',
                borderRadius: '4px',
                padding: 2,
                maxHeight: '100vh',
                overflowY: 'auto',
                flexGrow: 1,
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}

            >
                <InfiniteScroll dataLength={jobs.length}>
                    <Grid container spacing={5} direction='column' justifyContent="center" alignItems="center">
                        {jobs.map((job, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ width: 500 }}>
                                    <CardHeader
                                        title={job.title}
                                        subheader={
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <SearchUserAvatar size={40} profileImagePath={job.user ? job.user.profileImagePath : null} />
                                                </Grid>
                                                <Grid item>
                                                    {job.user ? job.user.name : 'Unknown User'}
                                                </Grid>
                                            </Grid>
                                        }
                                        titleTypographyProps={{ align: 'center', variant: 'h6' }}
                                        subheaderTypographyProps={{ align: 'left', variant: 'subtitle1', color: 'textSecondary' }}
                                    />

                                    <CardContent>
                                        {job.description.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}

                                        <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                                        <Grid container direction="column" alignItems="flex-start">
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Location:</strong> {job.city}, {job.state}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Employment Type:</strong> {job.employmentType}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Salary:</strong> {job.salary} {job.currency}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Vacancies:</strong> {job.vacancies}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Seniority Level:</strong> {job.seniorityLevel}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                    <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                                    <CardActions>
                                        <Grid container justifyContent="center" alignItems="center">
                                            <Button
                                                onClick={() => handleApply(job.id)}
                                                disabled={!!appliedJobs[job.id]}
                                                style={{
                                                    backgroundColor: appliedJobs[job.id] ? '#ccc' : '#1976d2',
                                                    color: appliedJobs[job.id] ? '#000' : '#fff'
                                                }}
                                            >
                                                {appliedJobs[job.id] ? 'Applied' : 'Apply'}
                                            </Button>
                                        </Grid>

                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Box>

            <Grid item style={{ padding: '50px', paddingRight: '30px', maxWidth: 'fit-content', flexGrow: 1 }}>
                <Button variant="contained" onClick={handleClickOpen}>Add Job</Button>
            </Grid>



            <Dialog open={open} onClose={handleClose} PaperProps={{ className: 'custom-dialog' }}>
                <DialogTitle>Add a new job</DialogTitle>

                <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                <DialogContent>
                    <Grid container justifyContent="center" alignItems="center" spacing={2} direction='column' gap='15px'>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    displayEmpty
                                    renderValue={selected => {
                                        if (selected === "") {
                                            return <Typography style={{ color: '#7b7b7b' }}>Select Position</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ minWidth: 280 }}
                                >
                                    <MenuItem >

                                    </MenuItem>
                                    {jobTitles.map((job) => (
                                        <MenuItem key={job.value} value={job.value}>{job.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={50}>
                            <TextField margin="dense" id="description" label="Description" type="text" sx={{ minWidth: 420 }} multiline onChange={handleDescriptionChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="city"
                                label="City"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="state"
                                label="State"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={state}
                                onChange={handleStateChange}
                            />
                        </Grid>
                        <Grid container spacing={1} alignItems="center" justifyContent="center">
                            <Grid item xs={3}>
                                <TextField
                                    margin="dense"
                                    id="salary"
                                    label="Salary"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={salary}
                                    onChange={handleSalaryChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>

                                    <Select
                                        id="currency"
                                        value={currency}
                                        onChange={handleCurrencyRelease}
                                        displayEmpty
                                        renderValue={selected => {
                                            if (selected === "") {
                                                return <Typography style={{ color: '#7b7b7b' }}>Currency</Typography>;
                                            }
                                            return selected;
                                        }}
                                    >
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="RON">RON</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <TextField
                                margin="dense"
                                id="vacancies"
                                label="Vacancies"
                                type="number"

                                variant="outlined"
                                value={vacancies}
                                onChange={handleVacanciesChange}
                                sx={{ width: 120 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>

                                <Select
                                    id="seniorityLevel"
                                    value={seniorityLevel}
                                    onChange={handleSeniorityLevelChange}
                                    displayEmpty
                                    renderValue={selected => {
                                        if (selected === "") {
                                            return <Typography style={{ color: '#7b7b7b' }}>Seniority Level</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Select seniority level' }}
                                    sx={{ minWidth: 150 }}
                                >
                                    {['Intern', 'Junior', 'Middle', 'Senior', 'Architect'].map((level) => (
                                        <MenuItem key={level} value={level}>{level}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="employment type"
                                    name="employmentType"
                                    value={employmentType}
                                    onChange={handleEmploymentTypeChange}
                                >
                                    <FormControlLabel value="Full-Time" control={<Radio />} label="Full-time" />
                                    <FormControlLabel value="Part-Time" control={<Radio />} label="Part-time" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" style={{ borderColor: '#FF0000', color: 'white', backgroundColor: '#FF0000' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="outlined" style={{ borderColor: '#00CC00', color: 'white', backgroundColor: '#00CC00' }}>
                        Publish
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>


    );
};

export default Job;
