import { React, useState } from "react";
import i18n from "i18next";
import { Box, InputLabel, FormControl, NativeSelect, Collapse, CardActionArea } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Trans } from "react-i18next";

/**
 *  Manual language selection.
 *
 *  @category Basic
 *  @component
 */
function LanguageSwitch() {
    function setLanguage(language) {
        i18n.changeLanguage(language);
        return;
    }
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setChecked((prev) => !prev);
        console.log(checked)
    };


    return (
        <Box
            sx={{
                zIndex: "tooltip",
                position: "fixed",
                height: "50px",
                right: 0,
                top: "10vh",
                backgroundColor: "white",
                borderRadius: "20px 0px 0px 20px",
                display: "inline-flex"
            }}>
            <Box sx={{ width: "30px", display: "inline-flex" }}>
                <CardActionArea onClick={handleChange} sx={{borderRadius: "20px 0px 0px 20px"}}>
                    {checked ? (
                        <ArrowRight sx={{ fontSize: 30 }} />
                    ) : (
                        <ArrowLeft sx={{ fontSize: 30 }} />
                    )}
                </CardActionArea>
            </Box>
            <Collapse in={checked} orientation="horizontal">
                <Box item sx={{ width: "140px", display: "inline-flex" }}>
                    <FormControl >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            <Trans i18nKey="languageSwitch">Language</Trans>
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
                    <Box sx={{width:"15px"}}/>
                </Box>
            </Collapse>
        </Box >
    )
}

export default LanguageSwitch;
