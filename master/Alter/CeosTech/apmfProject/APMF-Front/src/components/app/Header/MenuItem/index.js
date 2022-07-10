import React from 'react';
import { useDispatch } from "react-redux";

import { setMenuId } from "../../../../app/Redux-slices/siteSlice";
import { resetSubMenuId } from "../../../../app/Redux-slices/siteSlice";
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuItem({menu}) {
  const dispatch = useDispatch(); 

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div className={open ? "itemColor" : ""}>
        <div
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={open ? "text__header_white" : "text__header"}
        >
          {menu.name}
        </div>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {menu.menu.map((subMenu) => (
                      <NavLink         
                        key={subMenu.id}
                        className="navlink--submenu"
                        to={`/${menu.link}/${subMenu.link}`}
                        onClick={(event) => {
                          // Will set the menu id we are on in the store
                          dispatch(resetSubMenuId(subMenu.id));
                          // Will close the submenu list
                          handleClose(event);
                          window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                          });
                        }}
                      >
                        {subMenu.name}
                      </NavLink>   
                    ))}
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
