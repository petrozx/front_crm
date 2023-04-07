import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Logout} from "@mui/icons-material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../store/slice/auth";
import {useRole} from "../util/hook";
import AdminMenu from "./adminMenu";
import {Button} from "@mui/material";
import {MenuKnob} from "./menuKnobe";

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const role = useRole()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event, route) => {
        navigate(route)
    };

    const logout = () => {
        localStorage.removeItem('jwt-token')
        dispatch(login())
        navigate('/login', {replace: true})
    }

    const pages = [
        {
            name: 'Компании',
            href: '/company'
        },
        {
            name: 'Заявки',
            href: '/orders'
        },
        {
            name: 'Новая заявка',
            href: '/order/add'
        }
    ];

    return (
        <>
            <AppBar position="static"
            sx={{mb: 5}}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuKnob key={page.href} page={page}/>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                            <Link
                                key={page.name}
                                style={{textDecoration: 'none', color: 'white'}} to={page.href}
                            >
                                <Button
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    variant="contained"
                                    disableElevation
                                    >
                                        {page.name}
                                </Button>
                            </Link>
                            ))}

                            {role==="admin"&&
                                <Box>
                                    <AdminMenu />
                                </Box>
                            }
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Выйти">
                                <MenuItem
                                    selected
                                    onClick={logout}
                                >
                                    <Logout
                                        fontSize={'large'}
                                    />
                                </MenuItem>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container
                maxWidth={'md'}
            >
                <Outlet/>
            </Container>
        </>
    );
}
export default ResponsiveAppBar;