import React, {useEffect, useState} from "react";
import CustomizedHook from "./CompaniesManySellect"
import {Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {matchIsValidTel, MuiTelInput} from "mui-tel-input";

export default function UserAdd() {
    const [companies, setCompanies] = useState([])
    const [validatePhone, setValidatePhone] = useState(false)
    const [state, setState] = useState({
        id: '',
        username: '',
        password: '',
        role: '',
        userAttribute: '',
        companyId: [],
        firstName: '',
        surname: '',
        secondName: '',
        mobilePhone: '',
        email: '',
        passport: '',
    })

    const companiesRequest = async () => {
        await fetch('http://localhost:8080/api/v1/companies', {
            headers: {'jwt-token': localStorage.getItem('jwt-token')}
        })
            .then( r => r.json())
            .then(json => setCompanies(json))
    }
    const roles = [
        {value: 'Администратор',
        type: 'admin'
        },
        {value: 'Менеджер',
        type: 'manager'
        }
    ]
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
        console.log(state);
    };

    const handleChangeCompanyId = (value) => {
        setState({...state, companyId: value.map(e => e.id)})
    }

    const handleChangeMobilePhone = (value) => {
        setState({...state, mobilePhone: value})
        if (value !== '') {
            if (!matchIsValidTel(value)) setValidatePhone(true)
            else setValidatePhone(false)
        } else setValidatePhone(false)
    }

    function handleSubmit() {
        const json = JSON.stringify(state)
        console.log(json);
        fetch('http://localhost:8080/api/v1/user/register', {
            method: 'POST',
            body: json,
            headers: {'jwt-token' : localStorage.getItem('jwt-token')}
        }).then(resp => resp.ok? console.log('ok') : console.log("err"))
    }

    useEffect(() => companiesRequest, [])
    return (
        <Container
            maxWidth={'md'}
        >
            <Typography
                mb={5}
                variant={'h3'}
                component={'h1'}
            >
                Добавить пользователя
            </Typography>
            <Grid
                container
                spacing={2}
            >
                <Grid item md={6}>
                    <CustomizedHook companies={companies} setC={handleChangeCompanyId}/>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            label={'Имя пользователя'}
                            name={'username'}
                            value={state.username}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            label={'Пароль'}
                            name={'password'}
                            type={'password'}
                            value={state.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Роль</InputLabel>
                        <Select
                            required
                            name={'role'}
                            labelId="role-label"
                            label='Роль'
                            id="role-select"
                            value={state.role}
                            onChange={handleChange}
                        >
                            {
                                roles.map((el, key) =>
                                    <MenuItem key={key} value={el.type}>{el.value}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Имя'}
                            name={'firstName'}
                            type={'firstName'}
                            value={state.firstName}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Фамилия'}
                            name={'surname'}
                            type={'surname'}
                            value={state.surname}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Отчество'}
                            name={'secondName'}
                            type={'secondName'}
                            value={state.secondName}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <MuiTelInput
                        error={validatePhone}
                        value={state.mobilePhone}
                        label={'Номер телефона'}
                        onChange={handleChangeMobilePhone}
                        fullWidth
                        helperText={validatePhone?'Номер телефона не верный.':''}
                    >
                    </MuiTelInput>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Почта'}
                            name={'email'}
                            type={'email'}
                            value={state.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Поспортные данные'}
                            name={'passport'}
                            type={'passport'}
                            value={state.passport}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12} mt={5} display={'flex'}>
                    <Button
                        endIcon={<SendIcon />}
                        size="large"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}