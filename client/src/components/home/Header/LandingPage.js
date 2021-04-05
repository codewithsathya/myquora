import React from 'react';
import './LandingPage.css';
import Sidebar from '../SideBars/Sidebar.js';
import Grid from "@material-ui/core/Grid";
import SearchBar from '../SearchBar/SearchBar.js';
import Feeds from '../Feeds/Feeds';

export default function LandingPage(props){
    return(
        <div className="main" >
             <Grid container >
                                <Grid item xs={0} sm={2} >
                                        <Sidebar />
                                </Grid>

                                <Grid item xs={12} sm={10}>
                                        <div className="main_body" >
                                                <SearchBar style={{minheight:"15vh"}}/>       
                                        </div>
                                        <Feeds
                                        page={props.page}
                                        />
                                    
                                </Grid>

                        </Grid>
        </div>
    )
};