import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { SearchAppBar } from "../components/SearchAppBar"
import ImageIcon from '@material-ui/icons/Image';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tabChanged } from "../actions";
import { Fragment, useEffect } from "react";
import { getUsers } from "../selectors";

export const UsersPage = () => {
    const users = useSelector(getUsers);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(tabChanged(1));
    }, [dispatch]);

    return (
        <>
            <SearchAppBar />
            <List>
                {
                    Object.values(users).sort((a, b) => a.CreatedAt < b.CreatedAt ? 1 : -1).map((user, i) => (
                        <Fragment key={i}>
                            <ListItem  component={Link} to={`/chat/${user.username}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.firstName + " " + user.lastName} secondary={"Since " + new Date(user.CreatedAt).toDateString()} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))
                }
            </List>
        </>
    )
};