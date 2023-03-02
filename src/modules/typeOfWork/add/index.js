import {useEffect, useState} from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Api} from "../../../api";
import {useToken} from "../../../util/hook";
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';

export const TypeOfWorkAdd = () => {
    const [typeOfWork, setTypeOfWork] = useState({
        id: '',
        name: ''
    })
    const [rows, setRows] = useState([])
    const token = useToken()
    const handleChange = (event) => {
        setTypeOfWork({...typeOfWork, [event.target.name]: event.target.value})
    };
    const handleSand = () => {
       Api.addTypeOfWork(typeOfWork, token).then(resp => setRows(prev => [...prev, resp.data]))
        setTypeOfWork({...typeOfWork, name: ''})
    }
    const handleDelete = (id) => {
        Api.removeTypeOfWork(id, token).then(resp => console.log(resp))
        setRows(prev => prev.filter(_ => _.id !== id))
    }
    useEffect(() => {
        Api.getTypeOfWork(token).then(resp => setRows(resp.data))
    }, [])
    return (
        <>
            <Box
            sx={{display: "flex"}}
            >
                <TextField
                    name={"name"}
                    value={typeOfWork.name}
                    label={"Название"}
                    onChange={handleChange}
                >
                </TextField>
                <Button
                    onClick={handleSand}
                    variant="contained"
                >Сохранить</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Виды работ</TableCell>
                            <TableCell align="right">Удалить</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}