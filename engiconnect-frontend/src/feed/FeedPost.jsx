import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
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
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [openComments, setOpenComments] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        const initializeData = async () => {
            const fetchedPosts = await fetchPosts();
            if (fetchedPosts && fetchedPosts.length > 0) {
                const [likesStatus, likeCounts] = await Promise.all([
                    fetchLikes(fetchedPosts),
                    fetchLikesCount(fetchedPosts)
                ]);
                applyLikesToPosts(fetchedPosts, likesStatus, likeCounts);
            }
        };
    
        initializeData();
    }, []);

    useEffect(() => {
        const savedLikes = localStorage.getItem('likes');
        if (savedLikes) {
            setLikes(JSON.parse(savedLikes));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    const applyLikesToPosts = (posts, likesStatus, likeCounts) => {
        const newLikes = posts.reduce((acc, post, index) => {
            acc[post.postId] = {
                isLiked: likesStatus[index],
                count: likeCounts[index]
            };
            return acc;
        }, {});
    
        console.log("New likes state: ", newLikes);
        setLikes({...newLikes});
    };
        

    const fetchPosts = async () => {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
        return data;
    };

    const fetchLikes = async (posts) => {
        const likesStatus = await Promise.all(posts.map(post => {
            return fetch(`/api/likes/check?userId=${currentUserData.id}&postId=${post.postId}`)
                .then(res => res.json())
                .catch(err => {
                    console.error('Error fetching like status for post:', post.postId, err);
                    return false; 
                });
        }));
        return likesStatus;
    };

    const fetchLikesCount = async (posts) => {
        const counts = await Promise.all(posts.map(post => {
            return fetch(`/api/likes/count?postId=${post.postId}`)
                .then(res => res.json())
                .then(count => {
                    return count || 0; 
                })
                .catch(err => {
                    return 0; 
                });
        }));
        return counts;
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

    const handleAddLike = async (postId) => {
        if (!currentUserData || !currentUserData.id || !postId) {
            console.error('User ID or Post ID is undefined:', currentUserData, postId);
            return;
        }
    
        try {
            const response = await fetch(`/api/likes/add-like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUserData.id, postId: postId })
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to add like: ${text}`);
            }
            const updatedLikeStatus = await response.json();
            console.log('Updated like status:', updatedLikeStatus);
            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: {
                    count: updatedLikeStatus.totalLikes,
                    isLiked: updatedLikeStatus.likedByUser
                }
            }));
        } catch (error) {
            console.error('Failed to add like:', error.message);
        }
        fetchPosts().then(fetchedPosts => {
            fetchLikes(fetchedPosts);
            fetchLikesCount(fetchedPosts);
        });
    };
    
    const handleRemoveLike = async (postId) => {
        if (!currentUserData || !currentUserData.id || !postId) {
            console.error('User ID or Post ID is undefined:', currentUserData, postId);
            return;
        }
    
        try {
            const response = await fetch(`/api/likes/delete-like?userId=${currentUserData.id}&postId=${postId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Something went wrong with removing like');
            }
            const updatedLikeStatus = await response.json();
            console.log('Updated like status:', updatedLikeStatus);
            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: {
                    count: updatedLikeStatus.totalLikes,
                    isLiked: updatedLikeStatus.likedByUser
                }
            }));
        } catch (error) {
            console.error('Failed to remove like:', error);
        }
    };
    


    const handleOpenComments = async (postId) => {
        try {
            const response = await fetch(`/api/comments?postId=${postId}`);
            const data = await response.json();
            setComments({ ...comments, [postId]: data });

            setCurrentPostId(postId);
            setOpenComments(true);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleAddComment = async (commentText) => {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userId=${currentUserData.id}&postId=${currentPostId}&commentText=${commentText}`
            });
            if (response.ok) {
                const newComment = await response.json();
                setComments(prev => ({ ...prev, [currentPostId]: [...prev[currentPostId], newComment] }));
                setNewCommentText('');
            } else {
                throw new Error('Failed to add comment');
            }
        } catch (error) {
            console.error('Failed to submit comment:', error);
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
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => likes[post.postId]?.isLiked ? handleRemoveLike(post.postId) : handleAddLike(post.postId)}
                                            style={{
                                                backgroundColor: likes[post.postId]?.isLiked ? '#1976d2' : 'transparent',
                                                color: likes[post.postId]?.isLiked ? 'white' : 'black'
                                            }}
                                        >
                                            Like
                                        </Button>
                                        <Button size="small" onClick={() => handleOpenComments(post.postId)}>Comment</Button>
                                        <Typography variant="body2">
                                            {likes[post.postId]?.count || 0} likes
                                        </Typography>
                                    </CardActions>
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

            <Dialog open={openComments} onClose={() => setOpenComments(false)}>
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    {comments[currentPostId] && comments[currentPostId].map((comment, index) => (
                        <Box key={index}>
                            <Typography>{comment.user.name}: {comment.commentText}</Typography>
                        </Box>
                    ))}
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAddComment(newCommentText)}>Add Comment</Button>
                    <Button onClick={() => setOpenComments(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>


    );
};

export default FeedPost;
