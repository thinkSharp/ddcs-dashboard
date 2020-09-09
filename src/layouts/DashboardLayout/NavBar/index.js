import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Search as SearchIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  PlusCircle as PlusCircleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Layout as LayoutIcon,
  Server as ServerIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/vishal.jpg',
  jobTitle: 'Lead Data Engineer',
  name: 'Vishal Bajoria'
};

const catalogs = [
  {
    href: '/cat/search',
    icon: SearchIcon,
    title: 'Search'
  },
  {
    href: '/cat/add',
    icon: PlusCircleIcon,
    title: 'Add'
  },
  {
    href: '/cat/edit',
    icon: CheckCircleIcon,
    title: 'Edit'
  },
  {
    href: '/cat/retire',
    icon: XCircleIcon,
    title: 'Retire'
  },
];

const acquisitions = [
  {
    href: '/acq/search',
    icon: SearchIcon,
    title: 'Search'
  },
  {
    href: '/acq/add',
    icon: PlusCircleIcon,
    title: 'Add'
  },
  {
    href: '/acq/edit',
    icon: CheckCircleIcon,
    title: 'Edit'
  },
  {
    href: '/acq/retire',
    icon: XCircleIcon,
    title: 'Retire'
  },
  {
    href: '/acq/datasetprofile',
    icon: ServerIcon,
    title: 'Profiling'
  },
  {
    href: '/acq/datasetquality',
    icon: LayoutIcon,
    title: 'Quality'
  },
];

const depostories = [
  {
    href: '/dep/search',
    icon: SearchIcon,
    title: 'Search'
  },
  {
    href: '/dep/add',
    icon: PlusCircleIcon,
    title: 'Add'
  },
  {
    href: '/dep/edit',
    icon: CheckCircleIcon,
    title: 'Edit'
  },
  {
    href: '/dep/retire',
    icon: XCircleIcon,
    title: 'Retire'
  },
  {
    href: '/dep/profile',
    icon: ServerIcon,
    title: 'Profiling'
  },
  {
    href: '/dep/quality',
    icon: LayoutIcon,
    title: 'Quality'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
     
      <Box p={2}>
      <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          Catalog
        </Typography>
        <List>
          {catalogs.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
     
      <Box p={2}>
      <Typography
          color="textSecondary"
          variant="h5"
        >
          Depository Acquisition
        </Typography>
        <List>
          {acquisitions.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
      <Box p={2}>
      <Typography
          color="textSecondary"
          variant="h5"
        >
          Depository Subscription
        </Typography>
        <List>
          {depostories.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box> 
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
    </Box>
    
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
