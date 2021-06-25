import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const getMuiTheme = () => {
    createMuiTheme({
        shadows: Array(25).fill("none"),
        overrides: {
            MUIDataTableSelectCell: {
                expandDisabled: {
                    // Soft hide the button.
                    visibility: "hidden",
                },
                root: {
                    backgroundColor: "#e9e9e9",
                    padding: "5px",
                },
                body: {
                    border: "1px solid rgba(224, 224, 224, 1)"
                }
            },
            MUIDataTableBodyRow: {
                root: {
                    "&:nth-child(odd)": {
                        backgroundColor: "#f6f8fa",
                    },
                },
            },
            MUIDataTableBodyCell: {
                root: {
                    padding: "5px",
                },
            },
            MUIDataTableHeadRow: {
                root: {
                    backgroundColor: "#FF0000",
                },
            },
            MuiTableSortLabel: {
                root: {
                    color: "#ffffff",
                    "&:hover": {
                        color: "#ffffff",

                        "&& $icon": {
                            opacity: 1,
                            color: "#ffffff",
                        },
                    },
                    "&$active": {
                        color: "#ffffff",

                        // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
                        "&& $icon": {
                            opacity: 1,
                            color: "#ffffff",
                        },
                    },
                },
            },
            MUIDataTableHeadCell: {
                sortActive: {
                    color: "#ffffff",
                },
                sortAction: {
                    color: "#ffffff",
                },
                fixedHeader: {
                    backgroundColor: "#FF0000",
                    padding: "5px",
                },
                data: {
                    color: "#ffffff",
                    fontWeight: "bold",
                },
            },

        },
    })
}

export default getMuiTheme;