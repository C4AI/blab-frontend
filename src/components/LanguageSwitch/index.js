import { React, useState } from "react";
import i18n from "i18next";
import { Grid, InputLabel, FormControl, NativeSelect, Collapse, CardActionArea } from '@mui/material';
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

    const endev = () => {
        console.log('end event')
    }

    return (
        <Collapse in={checked} addEndListener={endev}>
            <Grid container 
                sx={{
                    zIndex: "tooltip",
                    position: "fixed",
                    width: "170px",
                    height: "50px",
                    left: 0,
                    top: {
                        xs: "85vh",
                        md: "10vh",
                    },
                    backgroundColor: "white",
                    borderRadius: 1
                }}
                styles={{}}
                >
                <Grid item sx={{width:"15px"}}/>
                <Grid item sx={{width:"125px"}}>
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
                </Grid>
                <Grid item sx={{width:"30px"}}>
                    <CardActionArea onClick={handleChange} sx={{width:"100%", height:"100%"}}>
                        {checked ? 
                            <ArrowLeft sx={{ fontSize: 30 }}/> 
                            : 
                            <ArrowRight sx={{ fontSize: 30 }}/>}
                    </CardActionArea>
                </Grid>
            </Grid>
        </Collapse>

    )
}

export default LanguageSwitch;
