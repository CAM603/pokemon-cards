import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "./Type.css";

export const TypeFilter = ({ filters, selectFilter }) => {
    const [types, setTypes] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/type")
            .then((res) => {
                // Filter out type if no pokemon for that type
                return Promise.all(
                    res.data.results.map((type) => {
                        return axios
                            .get(type.url)
                            .then((res) => {
                                if (res.data.pokemon.length > 0) {
                                    return res.data.name;
                                } else {
                                    return false;
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                );
            })
            .then((res) =>
                setTypes(
                    res.reduce((filtered, type) => {
                        if (type) {
                            filtered.push(type);
                        }
                        return filtered;
                    }, [])
                )
            )
            .catch((err) => console.log(err))
            .catch((err) => console.log(err));
    }, []);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const getStyles = (type, filterNames, theme) => {
        return {
            fontWeight: filterNames.indexOf(type) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
        };
    };
    console.log(types);
    return (
        <FormControl sx={{ m: 0, width: 300 }}>
            <InputLabel>Types</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={filters}
                onChange={selectFilter}
                input={<OutlinedInput label="Types" />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {types.map((type) => (
                    <MenuItem key={type} value={type} style={getStyles(type, filters, theme)}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
