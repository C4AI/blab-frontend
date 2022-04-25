import React from "react";
import { Box, InputLabel, FormControl, NativeSelect } from '@mui/material';

function LanguageSwitch() {
    return (
        <Box 
            sx={{
                zIndex: "tooltip",
                position: "fixed", 
                width: 150,
                height: 50,
                right: 0,
                top: "10vh",
                backgroundColor: "white",
                borderRadius: 1
            }}>
            <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Language
                </InputLabel>
                <NativeSelect
                    defaultValue="pt"
                    inputProps={{
                        name: 'language',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

export default LanguageSwitch;