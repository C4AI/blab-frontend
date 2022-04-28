import React from "react";
import i18n from "i18next";
import { Box, InputLabel, FormControl, NativeSelect } from '@mui/material';

function LanguageSwitch() {
    function setLanguage(language) {
        i18n.changeLanguage(language);
        return;
    }

    return (
        <Box 
            sx={{
                zIndex: "tooltip",
                position: "fixed", 
                width: 150,
                height: 50,
                left: 0,
                top: {
                    xs: "85vh",
                    md: "10vh",
                },
                backgroundColor: "white",
                borderRadius: 1
            }}>
            <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Language
                </InputLabel>
                <NativeSelect
                    defaultValue={i18n.language}
                    inputProps={{
                        name: 'language',
                        id: 'uncontrolled-native',
                    }}
                    onChange={() => setLanguage(event.target.value)}
                >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

export default LanguageSwitch;
