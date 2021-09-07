import { AppBar, Toolbar, makeStyles, Tabs, Tab, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import SettingsIcon from '@material-ui/icons/Settings';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTabIndex } from '../selectors';
import { tabChanged } from '../actions'
import { useToken } from '../auth/token';
import { useState } from 'react';
import { useEffect } from 'react';
import ws from '../socket';
const useStyle = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0
    },
}));

export const AppLayoutRoute = ({ children, secure, hideAppBar, ...rest }) => {
    const [token] = useToken();
    const classes = useStyle();
    const selectedTab = useSelector(getTabIndex);
    const dispatch = useDispatch();
    const history = useHistory();
    const [confirmLogout, setConfirmLogout] = useState(false);

    useEffect(() => {
        ws.connect();
      }, []);

    const logout = () => {
        localStorage.removeItem('token');
        history.push("/");
    }

    if(secure) {
        if(!token) {
            return (<Redirect to="/login" />)
        }
    }
    return (
        <Route {...rest}>
            {children}
            {!hideAppBar && 
                (<>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, newValue) => newValue === 2 ? setConfirmLogout(true) : dispatch(tabChanged(newValue, history))}
                            variant="fullWidth"
                        >
                            <Tab icon={<ChatIcon />} aria-label="Messages" />
                            <Tab icon={<ContactsIcon />} aria-label="Users" />
                            <Tab icon={<ExitToAppIcon />} aria-label="Logout" />
                            {/* <Tab icon={<SettingsIcon />} aria-label="Settings" /> */}
                        </Tabs>
                    </AppBar>
                    <Toolbar />
                    <Dialog aria-labelledby="simple-dialog-title" open={confirmLogout}>
                        <DialogTitle id="simple-dialog-title">Are you sure to logout?</DialogTitle>
                        <DialogActions>
                            <Button onClick={logout} color="secondary" autoFocus>
                                Logout
                            </Button>
                            <Button onClick={() => setConfirmLogout(false)} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>)
            }
        </Route>
    )
}