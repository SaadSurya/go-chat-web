import { Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tabChanged } from '../actions';
import { SearchAppBar } from '../components/SearchAppBar';
import { getChats } from '../selectors';


export const ChatListPage = () => {
    const chats = useSelector(getChats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tabChanged(0));
    }, [dispatch]);
    
    return (
        <>
            <SearchAppBar />
            <List>
                {
                    Object.values(chats).sort((a, b) => a.lastMessagedAt < b.lastMessagedAt ? 1 : -1).map((chat, i) => (
                        <Fragment key={i}>
                            <ListItem key={i} component={Link} to={`/chat/${chat.username}`} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={chat.firstName + ' ' + chat.lastName} src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.firstName + ' ' + chat.lastName}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {chat.from === chat.username ? '' : 'You - '}
                                            </Typography>
                                            {chat.text}
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))
                }
            </List>
        </>
    )
}