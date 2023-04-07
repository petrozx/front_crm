import React, {useEffect, useMemo, useRef, useState} from "react";
import dayjs from 'dayjs';
import SendIcon from '@mui/icons-material/Send';
import {
    Button,
    FormControl, FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {useCompanies, useToken} from "../util/hook";
import Box from "@mui/material/Box";
import {Form} from "react-router-dom";
import {Api} from "../api";
import {instance} from "../util/axios/axiosInstance";
export default function OrderAdd() {
    const companies = useCompanies()
    const [errorSt, setErrorSt] = useState([])
    const [typeOfWorks, setTypeOfWorks] = useState([])
    const token = useToken()
    const [state, setState] = useState({
        orderID: '',
        typeOfWork: '',
        announcedDateOfWork: dayjs(new Date()).format("YYYY-MM-DDTHH:mm"),
        numberOfSeal: '',
        natureOfCargo: '',
        weight: '',
        containerType: '',
        numberContainer: '',
        sizeContainer: '',
        specialMarks: '',
        companyId: '',
    })
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    };

    useEffect(() => {
        for(const key in state) {
            if (state[key] !== '') {
                setErrorSt((prev) => prev.filter(f => f !== key))
            }
        }
    }, [state])

    useEffect(() => {
        Api.getTypeOfWork(token).then(resp => setTypeOfWorks(resp.data))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        for(const key in state) {
            if (state[key] === '') {
                setErrorSt((prev) => [...prev, key])
            }
        }
        if (errorSt.length === 0) {
            const result = Api.saveOrder(state, token)
            console.log(result)

        }
    }
    return (
       <Box>
            <Typography
                mb={5}
                variant={'h3'}
                component={'h1'}
            >
                Подать новую заявку
            </Typography>
           <Form
                noValidate
           >
                <Grid
                    container
                    spacing={2}
                    direction={'row'}
                >
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="companyId-label">Компания</InputLabel>
                            <Select
                                name={'companyId'}
                                labelId="demo-simple-select-label"
                                label='Компания'
                                id="companyId-select"
                                value={state.companyId}
                                onChange={handleChange}
                                error={errorSt.includes("companyId")}
                            >
                                {
                                    companies?
                                        companies.map(comp => <MenuItem key={comp.companyID} value={comp.companyID}>{comp.name}</MenuItem>)
                                        : <MenuItem disabled >Компании отсутствуют</MenuItem>
                                }
                            </Select>
                            <FormHelperText>{errorSt.includes("companyId")&&"Выберите компанию"}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="typeOfWork-label">Вид работ</InputLabel>
                                <Select
                                    name={'typeOfWork'}
                                    labelId="typeOfWork-label"
                                    label='Вид работ'
                                    id="typeOfWork-select"
                                    value={state.typeOfWork}
                                    onChange={handleChange}
                                    error={errorSt.includes("typeOfWork")}
                                >{typeOfWorks.length?
                                    typeOfWorks.map(el =>
                                    <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                                ): <MenuItem disabled selected>Список пуст</MenuItem>
                                }
                                </Select>
                            <FormHelperText>{errorSt.includes("typeOfWork")&&"Выберите вид работ"}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                            <Stack spacing={6}>
                                <TextField
                                    required
                                    name={"announcedDateOfWork"}
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue={state.announcedDateOfWork}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                />
                            </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Номер пломбы'}
                                name={'numberOfSeal'}
                                value={state.numberOfSeal}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Тип груза'}
                                name={'natureOfCargo'}
                                value={state.natureOfCargo}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Вес груза'}
                                name={'weight'}
                                value={state.weight}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Тип контейнера'}
                                name={'containerType'}
                                value={state.containerType}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                label={'Номер контейнера'}
                                name={'numberContainer'}
                                value={state.numberContainer}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Размер контейнера'}
                                name={'sizeContainer'}
                                value={state.sizeContainer}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label={'Размер контейнера'}
                                name={'specialMarks'}
                                value={state.specialMarks}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} mt={1} mb={5} display={'flex'}>
                        <Button
                            endIcon={<SendIcon />}
                            size="large"
                            variant="contained"
                            onClick={handleSubmit}
                            type={"submit"}
                        >
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
           </Form>
        </Box>
    )
}