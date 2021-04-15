import * as Manage from "../services/Manage";
import React, { useEffect, useState } from "react";
import UseTable from "./UseTable";
import Input from "./Input";
import {
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Toolbar,
    InputAdornment,
    makeStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Search } from "@material-ui/icons";
import Papa from "papaparse";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        flex: 1,
    },
    toolBar: {
        padding: theme.spacing(1),
    },
    tblContent: {
        margin: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(5),
        },
    },
    tablecell: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
        // height: "40 !important",
        // display: "flex",
        // overflow: "auto",
    },
    fillExpand: {
        flex: 1,
        minHeight: 0,
        overflow: "scroll",
    },
    row: {
        // height: 30
    },
}));

const Main = () => {
    const classes = useStyles();
    const [battleData, setBattleData] = useState([]);
    useEffect(() => {
        setLoading(true);
        async function getData(csvFile) {
            const response = await fetch(csvFile);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true });
            const rows = results.data;
            setLoading(false);
            setBattleData(rows);
        }
        getData("battles.csv");
    }, []);

    const newHeadCells = [
        { id: "name", label: "Name", align: "center", disableSorting: true },
        { id: "year", label: "Year", align: "center", disableSorting: true },
        {
            id: "battle_number",
            label: "Battle No",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_king",
            label: "Attacker King",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_king",
            label: "Defender King",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_1",
            label: "Attacker 1",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_2",
            label: "Attacker 2",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_3",
            label: "Attacker 3",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_4",
            label: "Attacker 4",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_1",
            label: "Defender 1",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_2",
            label: "Defender 2",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_3",
            label: "Defender 3",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_4",
            label: "Defender 4",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_outcome",
            label: "Attacker Outcome",
            align: "center",
            disableSorting: true,
        },
        {
            id: "battle_type",
            label: "Battle Type",
            align: "center",
            disableSorting: true,
        },
        {
            id: "major_death",
            label: "Major Death",
            align: "center",
            disableSorting: true,
        },
        {
            id: "major_capture",
            label: "Major Capture",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_size",
            label: "Attacker Size",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_size",
            label: "Defender Size",
            align: "center",
            disableSorting: true,
        },
        {
            id: "attacker_commander",
            label: "Attacker Commander",
            align: "center",
            disableSorting: true,
        },
        {
            id: "defender_commander",
            label: "Defender Commander",
            align: "center",
            disableSorting: true,
        },
        {
            id: "summer",
            label: "Summer",
            align: "center",
            disableSorting: true,
        },
        {
            id: "location",
            label: "Location",
            align: "center",
            disableSorting: true,
        },
        {
            id: "region",
            label: "Region",
            align: "center",
            disableSorting: true,
        },
    ];

    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const { TblContainer, TblHead, recordsAfterSorting } = UseTable(
        battleData,
        newHeadCells,
        filterFn
    );

    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value == "") return items;
                else
                    return items.filter((x) =>
                        x.location.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    // console.log(Manage.getList(battleData))
    // console.log(Manage.getCount(battleData))

    return (
        <>
            <Paper>
                <Toolbar className={classes.toolBar}>
                    <Input
                        label="Search"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <TblContainer className={classes.tblContent}>
                        <TblHead />

                        <TableBody className={classes.fillExpand}>
                            {recordsAfterSorting().map((record) => (
                                <TableRow
                                    className={classes.row}
                                    key={record.battle_number}
                                >
                                    <TableCell
                                        className={classes.tablecell}
                                        style={{
                                            justifyContent: "center",
                                        }}
                                    >
                                        {record.name}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.year}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.battle_number}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_king}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_king}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_1}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_2}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_3}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_4}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_1}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_2}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_3}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_4}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_outcome}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.battle_type}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.major_death}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.major_capture}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_size}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_size}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.attacker_commander}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.defender_commander}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.summer}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.location}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tablecell}
                                        align="center"
                                    >
                                        {record.region}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TblContainer>
                )}
            </Paper>
        </>
    );
};

export default Main;
