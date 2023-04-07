import {useCompanies, useToken} from "../../util/hook";
import {
    Accordion,
    AccordionSummary, Autocomplete, Badge,
    Paper, Stack, Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Api} from "../../api";
import {useEffect, useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Checkbox from "@mui/material/Checkbox";

const statuses = {
    seen: "Просмотрено",
    new: "Новая"
}
export default function Orders() {
    const companies = useCompanies()
    const token = useToken()
    const [[orders, seen], setOrders] = useState([])
    const [color, setColor] = useState("rgb(253, 237, 237)")
    useEffect(() => {
            Api.getOrders(token).then(({data}) => setOrders(data))
            Api.allSeen(token)
        }, [])
    function counter(companyID) {
        return orders?.filter(order => order.companyId === companyID).length
    }
    const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40, display: 'flex', flexWrap: 'nowrap',
    alignItems: 'center', justifyContent: 'center'};
    const shapeCircleStyles = { borderRadius: '50%' };
    const circle = (num) => (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
            <Typography sx={{color: 'white'}}>{num}</Typography>
        </Box>
    );
    const style = {
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 1s ease-in-out",
        borderRadius: "4px",
        boxShadow: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "0.875rem",
        lineHeight: "1.43",
        letterSpacing: "0.01071em",
        backgroundColor: color,
        padding: "6px 16px",
        color: "rgb(95, 33, 32)",
    }

    setTimeout(() => {
        setColor("white")
    }, 5000)

    function tRow(order, seen) {
        if (order.status === "new"||order.orderID===seen?.orderId) {
            return ({...style})
        }
    }
    function checkboxHandler(e, bool, id) {
        console.log(id)
        console.log(bool)
    }

    const doThis = [{
        name: "Удалить",
        code: "del"
    }]
    return (
        <>
            <Stack spacing={1} sx={{ width: 300 , mb:3, d: flex}}>
                <Autocomplete
                    options={doThis}
                    getOptionLabel={(option) => option.name}
                    clearOnEscape
                    renderInput={(params) => (
                        <TextField {...params} label="выберите действие" variant="standard" />
                    )}
                />
            </Stack>
            {companies.map(comp =>
                <Accordion key={comp.companyID}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                        <div style={{display: "flex", width: '100%', justifyContent: 'space-between'}}>
                            <Typography>{comp.name}</Typography>
                            <Badge sx={{mr: '15px'}} color={seen?"primary":"success"} overlap="circular" badgeContent={seen?.length}>
                                {circle(counter(comp.companyID))}
                            </Badge>
                        </div>
                    </AccordionSummary>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Выбрать</TableCell>
                                    <TableCell align="right">Дата</TableCell>
                                    <TableCell align="right">Вид работ</TableCell>
                                    <TableCell align="right">Прикрепленные файлы</TableCell>
                                    <TableCell align="right">Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                        {orders?.map((order) => order.companyId===comp.companyID?
                                    <TableRow
                                        key={order.orderID}
                                        sx = {tRow(order, seen)}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Checkbox
                                                onChange={(a,s) => checkboxHandler(a, s, order.orderID)}
                                                defaultChecked={false}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {order.announcedDateOfWork}
                                        </TableCell>
                                        <TableCell align="right">
                                           {order.typeOfWork}</TableCell>
                                        <TableCell align="right">
                                            {/*<AddAPhotoIcon fontSize="large"/>
                                            <AutoAwesomeMotionIcon fontSize="large"/>*/}
                                        </TableCell>
                                        <TableCell align="right">
                                            {statuses[order.status]}</TableCell>
                                    </TableRow>
                            : null
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Accordion>
            )}
        </>
    )
}