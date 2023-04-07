import React, {useState} from "react";
import {Button, Container, FormControl, Grid, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Api} from "../api";
import {useToken} from "../util/hook";
import {useDispatch} from "react-redux";
import {addCompany} from "../store/slice/company";

export default function CompanyAdd() {
    const [state, setState] = useState({
        id: '',
        name: '',
        inn: '',
        ogrn: '',
    })
    const token = useToken()
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    };

    const handleSubmit = () => {
        Api.saveCompany(state, token).then(r => dispatch(addCompany(r.data)))
    }
    return (
        <Container
            maxWidth={'md'}
        >
            <Typography
                mb={5}
                variant={'h3'}
                component={'h1'}
            >
                Новая компания
            </Typography>
            <Grid
                container
                spacing={2}
            >
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Название'}
                            name={'name'}
                            value={state.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'Инн'}
                            name={'inn'}
                            value={state.inn}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <TextField
                            label={'ОГРН'}
                            name={'ogrn'}
                            value={state.ogrn}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12} mt={5} alignItems="flex-end">
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