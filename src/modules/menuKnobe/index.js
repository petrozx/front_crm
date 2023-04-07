import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function MenuKnob(props) {
    const {page} = props
    return  <Link key={page.name} style={{textDecoration: 'none', color: 'white'}} to={page.href}>
                <MenuItem>
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
            </Link>
}