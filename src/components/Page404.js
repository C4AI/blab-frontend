import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Typography, Button, Grid } from "@mui/material";

/**
 *  Page 404 to be shown when user tries to acess a nonexistent page like https://website.com/ThisDoesNotExist .
 *
 *  @category Basic
 *  @component
 */
function Page404() {
    return (
        <div className="page404">
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "#22B1FF",
                    display: 'flex',
                }}
            >
                <Paper
                    elevation={24}
                    sx={{
                        margin: "auto",
                        height: {
                            xs: "100vh",
                            md: "70vh",
                        },
                        width: {
                            xs: "100vw",
                            md: "800px",
                        },
                        maxWidth: {
                            xs: "100vw",
                            mds: "800px",
                        },
                        backgroundColor: "#00605D",
                        borderRadius: {
                            xs: 0,
                            md: 10,
                        },
                    }}
                >
                    <Grid container
                        sx={{
                            height: "100%"
                        }}
                    >
                        <Grid item xs={12} sm={8}
                            sx={{
                                height: {
                                    xs: "30%",
                                    sm: "55%",
                                },
                                display: 'flex',
                            }}
                        >
                            <Box
                                sx={{
                                    margin: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography color="white" variant="h1" sx={{ margin: "auto" }}>
                                    404
                                </Typography>
                                <Typography color="white" variant="h3" sx={{ margin: "auto" }}>
                                    Page Not Found
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={4} order={{ xs: 3, sm: 2 }}
                            sx={{
                                height: {
                                    xs: "30%",
                                    sm: "55%",
                                },
                                display: 'flex',
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    margin: "auto",
                                    height: 150,
                                    width: 150,
                                }}
                                src={require("../images/404_bot_lc_white.png")}
                            />
                        </Grid>
                        <Grid item xs={12} order={{ xs: 2, sm: 3 }}
                            sx={{
                                height: "25%",
                                display:'flex',
                            }}
                        >
                            <Typography
                                color="white"
                                variant="h4"
                                sx={{
                                    margin: "auto",
                                    maxWidth: "90%",
                                }}
                            >
                                Esta página não existe ou algo deu errado.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} order={{ xs: 4, sm: 4 }}
                            sx={{
                                height: "20%",
                            }}
                        >
                            <Button
                                variant="contained"
                                component={Link}
                                to="/"
                                sx={{
                                    margin: "auto"
                                }}
                                style={{
                                    backgroundColor:"#22B1FF",
                                    color:"black",
                                }}
                            >
                                Voltar ao início
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        </div>
    )
}

export default Page404;