import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { List, Drawer, ListItem, ListItemText, ListItemButton } from '@mui/material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import Logo from 'src/components/logo';

import Cart from './common/cart';
import { bgBlur } from '../../theme/css';
import headerConfig from './config-header';
import { NAV, HEADER } from './config-layout';
import Iconify from '../../components/iconify';
import AccountPopover from './common/account-popover';
import { useResponsive } from '../../components/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function Header({ openNav, onCloseNav, onOpenNav }) {
  const theme = useTheme();
  const pathname = usePathname();

  const lgUp = useResponsive('up', 'md');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack direction="row" component="nav" spacing={0.5} sx={{ px: 2, position: 'relative' }}>
      {headerConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      {lgUp && (
        <>
          <Box sx={{ flexGrow: 1 }}>{renderMenu}</Box>
          <Box sx={{ flexGrow: 1 }} />
          <Logo sx={{ mr: { xs: 2, sm: 5, md: 10, lg: 48 } }} />
        </>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
        <Cart />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          minWidth: '100%',
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>

      {!lgUp && (
        <Drawer
          anchor="left"
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{ sx: { width: NAV.WIDTH } }}
        >
          <Box sx={{ p: 2 }}>
            <Logo />
          </Box>
          <List>
            {headerConfig.map((item) => (
              <ListItem key={item.title} button component={RouterLink} href={item.path}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}

Header.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  onOpenNav: PropTypes.func,
};
function NavItem({ item }) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => setOpenMenu(!openMenu);

  return (
    <Box>
      <ListItemButton
        onClick={item.children ? handleClick : undefined}
        component={RouterLink}
        href={item.path}
        sx={{
          minHeight: 35,
          borderRadius: 0.75,
          typography: 'body1',
          color: '#3b413a',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
        }}
      >
        <Box component="span">{item.title}</Box>

        {item.children && (
          <Box component="span" sx={{ width: 20, height: 20, ml: 1 }}>
            {item.iconRight}
          </Box>
        )}
      </ListItemButton>

      {openMenu && item.children && (
        <Box
          sx={{
            position: 'absolute',
            mt: 1,
            boxShadow: 3,
            borderRadius: 1,
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Stack>
            {item.children.map((child) => (
              <ListItemButton
                key={child.title}
                component={RouterLink}
                href={child.path}
                sx={{
                  minHeight: 30,
                  borderRadius: 0.75,
                  typography: 'body2',
                  color: '#3b413a',
                  textTransform: 'capitalize',
                  fontWeight: 'fontWeightMedium',
                  ...(child.path === pathname && {
                    color: '#3b413a',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: '#faf5f6',
                    '&:hover': {
                      bgcolor: '#f5fcf4',
                    },
                  }),
                }}
              >
                <Box component="span" sx={{ width: 20, height: 20, mr: 1 }}>
                  {child.icon}
                </Box>

                <Box component="span">{child.title}</Box>
              </ListItemButton>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
