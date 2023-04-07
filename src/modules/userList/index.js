import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {Api} from "../../api";
import {useToken} from "../../util/hook";
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom";
import * as React from "react";

export function UserList() {
    const [users, setUsers] = useState([])
    const token = useToken()
    useEffect(() => {
        Api.getUsers(token).then(r => setUsers(r.data))
        }, [])

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Логин пользователя</TableCell>
                        <TableCell align="right">Пароль</TableCell>
                        <TableCell align="right">Роль</TableCell>
                        <TableCell align="right">Редактировать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(([user, userAttr, companiesIDs]) => (
                        <TableRow
                            key={user.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.username}
                            </TableCell>
                            <TableCell align="right">******</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                            <TableCell align="right">
                                <Link
                                    style={{textDecoration: 'none', color: 'inherit'}}
                                    state={{
                                        method: "UPDATE",
                                        ...user,
                                        ...userAttr,
                                        companyId: companiesIDs
                                    }}
                                    to={"/user/edit"}>
                                    <EditIcon />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}