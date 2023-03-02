import {useCompanies} from "../../util/hook";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Orders() {
    const companies = useCompanies()

    return (
        <>
            {companies.map(comp =>
                <Accordion key={comp.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                        <Typography>{comp.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>что то то </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                        <Typography>что то то </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    )
}