import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../css/GlobalStyle.css"
import { Box } from '@mui/material';
import UserContext from "../profile/UserContext.jsx";
import SearchUserAvatar from '../shared/SearchUserAvatar.jsx';


function FeedPost() {

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    // Using the useContext hook to obtain the current context value for UserContext, and storing it in the userContext variable.
    const userContext = useContext(UserContext);

    // Accessing the currentUserData property from the userContext object to get the data of the currently logged-in user.
    const currentUserData = userContext.currentUserData;

    // Accessing the updateCurrentUser function from the userContext object to have a function that updates the current user's data.
    const updateCurrentUser = userContext.updateCurrentUser;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {

        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setSelectedFile(null);
        setTitle('');
        setSummary('');
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            const selectedImage = URL.createObjectURL(event.target.files[0]);
            setImage(selectedImage);
        }
    };
    

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('content', summary);
        formData.append('title', title);
        formData.append('userId', currentUserData.id);

        try {
            const response = await fetch('/api/posts/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const result = await response.json();
            console.log(result);
            handleClose();
            fetchPosts();
        } catch (error) {
            console.error('Failed to submit post:', error);
        }
    };


    return (

        <Container maxWidth="100%" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }} >

            <Grid item style={{ padding: '50px', paddingRight: '110px', maxWidth: 'fit-content', flexGrow: 0 }}>

            </Grid>

            <Box justifyContent="center" alignItems="center" sx={{ marginTop: 2, border: '2px solid #ccc', borderRadius: '4px', padding: 2, maxHeight: '100vh', overflow: 'auto', flexGrow: 1 }}>
                <InfiniteScroll dataLength={posts.length}>
                    <Grid container spacing={5} direction='column' justifyContent="center" alignItems="center">
                        {posts.map((post, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ width: 500 }}>
                                    <CardHeader
                                        title={post.title}
                                        subheader={
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <SearchUserAvatar size={40} profileImagePath={post.user ? post.user.profileImagePath : null} />
                                                </Grid>
                                                <Grid item>
                                                    {post.user ? post.user.name : 'Unknown User'}
                                                </Grid>
                                            </Grid>
                                        }
                                        titleTypographyProps={{ align: 'center', variant: 'h6' }}
                                        subheaderTypographyProps={{ align: 'left', variant: 'subtitle1', color: 'textSecondary' }}
                                    />

                                    <CardContent>
                                        {post.content.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </CardContent>

                                    {/* Conditionally render CardMedia only if there is an image URL */}
                                    {post.imageUrl && (
                                        <CardMedia component="img" height="400" image={post.imageUrl} alt={post.title} />
                                    )}
                                    <CardActions><Button size="small">See more</Button></CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Box>

            <Grid item style={{ padding: '50px', paddingRight: '30px', maxWidth: 'fit-content', flexGrow: 1 }}>
                <Button variant="contained" onClick={handleClickOpen}>Add post</Button>
            </Grid>



            <Dialog open={open} onClose={handleClose} PaperProps={{ className: 'custom-dialog' }}>
                <DialogTitle>Add a new post</DialogTitle>
                <DialogContent>
                    <Grid container justifyContent="center" alignItems="center" spacing={2} direction='column' gap='15px'>
                        <Grid item>
                            <TextField autoFocus margin="dense" id="title" label="Titlu Postare" type="text" fullWidth onChange={handleTitleChange} variant="standard" />
                        </Grid>
                        <Grid item>
                            <TextField id="summary" label="Sumar Postare" type="text" fullWidth onChange={handleSummaryChange} variant="outlined" multiline />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" component="label">Upload Image<input type="file" hidden onChange={handleImageChange} /></Button>
                        </Grid>
                        {image && <Grid item><img src={image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} /></Grid>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Publish</Button>
                </DialogActions>
            </Dialog>
        </Container>


    );
};

export default FeedPost;
