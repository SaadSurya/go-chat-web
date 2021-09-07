import { alpha, AppBar, Card, IconButton, InputBase, makeStyles, Toolbar, Typography } from "@material-ui/core"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useToken } from "../auth/token";
import { getChats, getMessages, getUsers } from "../selectors";
import { loadMessages, sendMessage } from "../services/message.service";

const useStyle = makeStyles((theme) => ({
    messagesContainer: {
        padding: theme.spacing(1),
        backgroundColor: '#ebebeb',
        minHeight: 'calc(100vh - 112px)'
    },
    messageLeft: {
        display: 'flex',
        marginTop: theme.spacing(2),
        //marginLeft: theme.spacing(1),
        width: '100%',
    },
    messageRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: theme.spacing(2),
        width: '100%',
    },
    messageCard: {
        paddingBottom: theme.spacing(.5),
    },
    message: {
        margin: theme.spacing(1, 1, 0, 1),
        minWidth: '20vw',
    },
    messageTimeContainer: {
        marginRight: theme.spacing(1),
        textAlign: 'right',
    },
    messageTime: {
        fontSize: '.75rem',
    },
    backButton: {
        marginRight: theme.spacing(2),
        color: 'white',
    },
    bottomBar: {
        top: 'auto',
        bottom: 0,
    },
    input: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        //marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}))

export const ChatPage = () => {
    const classes = useStyle();
    const history = useHistory();
    const { username } = useParams();
    const users = useSelector(getUsers);
    const chats = useSelector(getChats);
    let user = chats[username] || users[username] || {}; 

    const messagesContainer = useRef();

    const [newMessage, setNewMessage] = useState('');

    const [, , claims] = useToken();
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
    }, [messages]);

    useEffect(() => {
        loadMessages(dispatch, username);
    }, [dispatch, username]);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className={classes.backButton} onClick={() => history.goBack()} >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <Typography>{user.firstName + ' ' + user.lastName}</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div ref={messagesContainer} className={classes.messagesContainer}>
                {
                    messages.map((message, i) => (
                        <div key={i} className={message.from === username ? classes.messageLeft : classes.messageRight}>
                            <Card>
                                {/* <CardContent className={classes.messageCard}> */}
                                <Typography className={classes.message} color="textSecondary" gutterBottom>
                                    {message.text}
                                </Typography>
                                <div className={classes.messageTimeContainer}>
                                    <Typography className={classes.messageTime} color="textSecondary">{new Date(message.CreatedAt).toLocaleTimeString()}</Typography>
                                </div>
                                {/* </CardContent> */}
                            </Card>
                        </div>
                    ))
                }

            </div>
            <AppBar position="fixed" className={classes.bottomBar}>
                <Toolbar>
                    <div className={classes.input}>
                        <InputBase
                            value={newMessage}
                            placeholder="Type... and hit Enter"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'type' }}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyUp={(e)=> (e.key === 'Enter') ? sendMessage(dispatch, claims.username, username, e.target.value) && setNewMessage(''): (0)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}