import React,{useState,useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {apiConfig} from '../api';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);
export default function Gallery() {
    const classes = useStyles();
    // the photos state
    const [photos,setPhotos] = useState([]); 
    // a counter to make the load more button loads more 10 photos each time clicked 
    const [counter,setCounter] = useState(1);
    useEffect(() => {
        // getting photos from the api using the axios library
        axios.get(apiConfig.baseURL).then(res=>setPhotos(res.data))
        // filtering just the albums with an even ID and the first image which has an id like this 51 , 151 , 251 ,351 ...
        const fiftyPhotos = photos.filter((pic : any,index)=>pic.albumId % 2 ===0 && pic.id%50===1  )
        setPhotos(fiftyPhotos);
        console.log(fiftyPhotos)
    
    }, [])
        return (
            <div>
            <Grid container className={classes.root} spacing={2}>
               {
                   photos.length>0 && photos.filter((pic,index)=>index<counter*10).map((photo : any)=>[
                    <Grid item xs={12} md={6} lg={4} key={photo.id}>
                            <img src={photo.url} alt=""/>
                    </Grid>   
                   ])
               }         
                   
         </Grid>
         <Button color="primary" onClick={()=>setCounter(counter+1)} disabled={counter>4} >
               {counter>4 ? "Done loading" : "Load More"}
             </Button> 
         </div>
    )
}
