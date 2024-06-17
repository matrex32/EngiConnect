import React, { useState, useContext, useEffect } from 'react';
import {
    Container, Grid, Card, CardHeader, FormControl, MenuItem, CardContent, CardActions, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Select, Typography, InputLabel, Input
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../css/GlobalStyle.css"
import { Box } from '@mui/material';
import UserContext from "../profile/UserContext.jsx";
import SearchUserAvatar from '../shared/SearchUserAvatar.jsx';
import '../css/BackgroundCard.css'


function Library() {

    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [department, setDepartment] = useState('');
    const [author, setAuthor] = useState('');
    const [degreeType, setDegreeType] = useState('');
    const [specialization, setSpecialization] = useState('');

    const userContext = useContext(UserContext);
    const currentUserData = userContext.currentUserData;

    const documentTitles = [
        { value: 'Electric actuators command', label: 'Comanda Acționărilor Electrice' },
        { value: 'Microcontrollers and programmable automata', label: 'Microcontrolere și Automate Programabile' },
        { value: 'Industrial robots', label: 'Roboți industriali' },
        { value: 'Computer environments used for design', label: 'Medii Informatice utilizate în Proiectare' },
        { value: 'Microprocessor systems', label: 'Sisteme cu Microprocesoare' },
        { value: 'Electric cars I', label: 'Mașini Electrice I' },
        { value: 'Applied informatics', label: 'Informatică Aplicată' },
        { value: 'Electric cars II', label: 'Mașini Electrice II' },
        { value: 'Electric actuators', label: 'Acționări Electrice' },
        { value: 'Computer networks', label: 'Rețele Informatice' },
        { value: 'Numerical methods', label: 'Metode Numerice' },
        { value: 'Electromagnetic field theory', label: 'Teoria Câmpului Electromagnetic' },
        { value: 'Electrical and electronic measurements', label: 'Măsurări Electrice și Electronice' },
        { value: 'Electrotechnical materials', label: 'Materiale Electrotehnice' },
        { value: 'Basics of electrical engineering', label: 'Bazele electrotehnicii' },
    ];
    

    const departments = [
        { value: 'Measurements, Electrical Devices and Static Converters', label: 'Măsurări, Aparate Electrice și Convertizoare Statice' },
        { value: 'Electrotechnics', label: 'Electrotehnică' },
        { value: 'Machines, Materials and Electric Drives', label: 'Mașini, Materiale și Acționări Electrice' },
    ];    

    const degreeTypes = [
        { value: 'bachelor', label: 'Licență' },
        { value: 'master', label: 'Master' }
    ];

    const bachelorSpecializations  = [
        { value: 'computerScience', label: 'Informatică Aplicată în Inginerie Electrică' },
        { value: 'engineering', label: 'Sisteme Electrice' },
        { value: 'business', label: 'Electronică de Putere și Acționări Electrice' },
        { value: 'Instrumentație și achiziții de date', label: 'Instrumentație și achiziții de date' },
        { value: 'Inginerie economică în domeniul electric, electronic și energetic', label: 'Inginerie economică în domeniul electric, electronic și energetic' },
    ];

    const masterSpecializations = [
        { value: 'Analiza şi modelarea sistemelor electromagnetice', label: 'Analiza şi modelarea sistemelor electromagnetice' },
        { value: 'Electronică de putere şi acţionări electrictrice inteligente', label: 'Electronică de putere şi acţionări electrictrice inteligente' },
        { value: 'Ingineria produselor şi serviciilor în electrotehnică', label: 'Ingineria produselor şi serviciilor în electrotehnică' },
        { value: 'Inginerie electrică şi informatică aplicată', label: 'Inginerie electrică şi informatică aplicată' },
        { value: 'Sisteme electrice avansate', label: 'Sisteme electrice avansate' },
        { value: 'Sisteme inteligente de instrumentaţie şi măsurare', label: 'Sisteme inteligente de instrumentaţie şi măsurare' }
    ];

    const [specializationOptions, setSpecializationOptions] = useState(bachelorSpecializations);

    useEffect(() => {
        handleDegreeTypeChange({ target: { value: degreeType } }); // Initialize specialization options
    }, []);
    

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/documents');
            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data)) {
                setDocuments(data);
            } else {
                console.error('Received data is not an array', data);
                setDocuments([]);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDegreeTypeChange = (event) => {
        const selectedDegreeType = event.target.value;
        setDegreeType(selectedDegreeType);
        
        // Reset specialization when degree type changes
        setSpecialization('');
    
        // Update specialization options based on degree type
        if (selectedDegreeType === 'master') {
            setSpecializationOptions(masterSpecializations);
        } else {
            setSpecializationOptions(bachelorSpecializations);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
        setDepartment('')
        setAuthor('')
    };

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleSubmit = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('department', department);
        formData.append('degreeType', degreeType);
        formData.append('specialization', specialization);

        try {
            const response = await fetch('/api/documents/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to upload document');
            const responseData = response.json();
            alert('Document uploaded successfully');
            handleClose();
            fetchDocuments();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload document.');
        }
    };

    const handleViewDocument = async (filename) => {
        try {
            const response = await fetch(`/api/documents/${filename}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch document');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            window.open(url, '_blank');
        } catch (error) {
            console.error('Failed to view document:', error);
            alert('Failed to load document for viewing.');
        }
    };

    const handleDelete = async (documentId) => {
        try {
            const response = await fetch(`/api/documents/delete/${documentId}`, {
                method: 'DELETE'
            });
            const data = await response.text();
            if (response.ok) {
                alert('Document deleted successfully');
                fetchDocuments();
            } else {
                throw new Error(data || 'Failed to delete document');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert(error.message);
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
                <InfiniteScroll dataLength={documents.length}>
                    <Grid container spacing={5} direction='column' justifyContent="center" alignItems="center">
                        {documents.map((document, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ width: 500 }}>
                                    <CardHeader
                                        title={document.title}
                                        subheader={
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <SearchUserAvatar size={40} profileImagePath={document.uploader ? document.uploader.profileImagePath : null} />
                                                </Grid>
                                                <Grid item>
                                                    {document.uploader ? document.uploader.name : 'Unknown User'}
                                                </Grid>
                                            </Grid>
                                        }
                                        titleTypographyProps={{ align: 'center', variant: 'h6' }}
                                        subheaderTypographyProps={{ align: 'left', variant: 'subtitle1', color: 'textSecondary' }}
                                    />

                                    <CardContent>
                                        {document.description.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}

                                        <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                                        <Grid container direction="column" alignItems="flex-start">

                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Author:</strong> {document.author}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Departament:</strong> {document.department}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Degree Type:</strong> {document.degreeType}
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Specialization:</strong> {document.specialization}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                    <div style={{ borderTop: '1px solid #ccc', margin: '8px 0' }}></div>

                                    <CardActions>
                                        <Grid container justifyContent="center" alignItems="center">

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleViewDocument(document.filePath.split('/').pop())}
                                            >
                                                View Document
                                            </Button>

                                            {currentUserData.id === document.uploader.id && (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDelete(document.documentId)}
                                                    style={{ marginLeft: '10px', borderColor: '#FF0000', color: 'white', backgroundColor: '#FF0000' }}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Grid>

                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Box>

            <Grid item style={{ padding: '50px', paddingRight: '30px', maxWidth: 'fit-content', flexGrow: 1 }}>
                <Button variant="contained" onClick={handleClickOpen}>Add File</Button>
            </Grid>



            <Dialog open={open} onClose={handleClose} PaperProps={{ className: 'custom-dialog' }}>
                <DialogTitle>Add a new file</DialogTitle>

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
                                            return <Typography style={{ color: '#7b7b7b' }}>Select the subject</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ minWidth: 280 }}
                                >
                                    <MenuItem >

                                    </MenuItem>
                                    {documentTitles.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={50}>
                            <TextField margin="dense" id="description" rows={4} label="Description" type="text" sx={{ minWidth: 420 }} multiline onChange={handleDescriptionChange} />
                        </Grid>

                        <TextField
                            label="Author"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            sx={{ mb: 2 }}
                        />


                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    value={department}
                                    onChange={e => setDepartment(e.target.value)}
                                    displayEmpty
                                    renderValue={selected => {
                                        if (selected === "") {
                                            return <Typography style={{ color: '#7b7b7b' }}>Select the departament</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Select departament' }}
                                    sx={{ minWidth: 180 }}
                                >
                                    {departments.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    value={degreeType}
                                    onChange={handleDegreeTypeChange}
                                    displayEmpty
                                    renderValue={selected => {
                                        if (selected === "") {
                                            return <Typography style={{ color: '#7b7b7b' }}>Select the Degree Type</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Select the Degree Type' }}
                                    sx={{ minWidth: 180 }}
                                >
                                    {degreeTypes.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    value={specialization}
                                    onChange={e => setSpecialization(e.target.value)}
                                    displayEmpty
                                    renderValue={selected => {
                                        if (selected === "") {
                                            return <Typography style={{ color: '#7b7b7b' }}>Select the Specializaion</Typography>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Select the Specialization' }}
                                    sx={{ minWidth: 180 }}
                                >
                                    {specializationOptions.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <Grid item>
                                <InputLabel htmlFor="upload-file">Upload File</InputLabel>
                                <Input
                                    id="upload-file"
                                    type="file"
                                    onChange={handleFileChange}
                                    fullWidth
                                />
                            </Grid>

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


export default Library;
