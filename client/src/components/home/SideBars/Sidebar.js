import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie'
import"./Sidebar.css";
import { Divider } from '@material-ui/core';
import Widgets from '../Widgets/Widgets';
import Hidden from '@material-ui/core/Hidden';

function Sidebar() {

        const [tagList, modifyTagList] = useState([])
        //Add loading state

        useEffect(() => {
                if(tagList.length === 0)
                {
                        const fetchTags = async () => {
                                const idToken = (new Cookies()).get('idToken')
                                const res = await fetch('http://localhost:5000/all_tags', {
                                        method: 'GET',
                                        headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + idToken
                                        }
                                })
                                const data = await res.json()
                                const newTagList = data.tagList
                                modifyTagList(newTagList)
                        }
                        fetchTags()
                }
        })

        const recentItem = (topic) => (
                <div className="sidebar__recentitem">
                <span className="sidebar__hash">#</span>
                <p>{topic}</p>
                </div>
        )
        return (
                <Hidden xsDown>
                <div className="Sidebar">
                
                <div className="sidebar__button" >
                        <Widgets/>
                </div>
                
                
                
                <div className="sidebar__button">
                        <div style={{color:"#c21808",fontSize:"20px",fontFamily:"inherit",textAlign:"center",textDecoration:"bold"}}>Tags</div>
                        <Divider/>
                        {
                                tagList.map(tag => (
                                        recentItem(tag._id)
                                ))
                        }
                        
                </div>
                
                </div>
                </Hidden>
        )
}

export default Sidebar