import React,{useState,useEffect} from 'react';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField
 
} from '@material-ui/core';

import './Create.css';





const  Create=()=> {

  
const [query,setquery] = useState('');
const [result,setResult] = useState( {Finalquery:'',Finaltags:[]});
const [tags, setTags] = useState([]);



const removeAllTags =()=>{
  setTags([]);
}


  useEffect(() => {
    console.log(result);
  },[result]);

  
const handleQuery = (e)=>{
  setquery(e.target.value);
}

const handleSubmit=(e)=>{
  e.preventDefault();
  setResult(preState=>({
      ...preState,
      Finalquery:query,
      Finaltags:tags
    }));
    removeAllTags(result.Finaltags);
    setquery('');
  
 

 
  
}



const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
};

const addTags = event => {

        const ans = event.target.value.slice(0,-1);
    if(tags.includes(ans))
    {
        event.target.value = ""; 
    }
    if (event.target.value !== "" ) {
        setTags([...tags, ans]);
        event.target.value = "";
    }
};




  return (
   

    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      
      <CssBaseline />
      
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Raise A New Question
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Ask Query
      </Typography>
      <Typography paragraph align="center">
       Add Tags to your Question for Better Reach
       </Typography>

       <Paper style={{ padding: 16 }}>
       <form>
       <Grid container alignItems="flex-start" spacing={2}>
      <Grid item sm={12} xs={12}>

       <TextField 
        required 
        error={query === ""}
        helperText={query === "" ? 'Cannot be left empty!' : ' '}      
        label="Note" type="text" value={query} onChange={handleQuery}  fullWidth autoFocus multiline placeholder="Ask Your Question Here" />

      </Grid>

      <Grid item xs={12} style={{ marginTop: 36 }} >
          
          {/* <TagsInput selectedTags={selectedTags}  tags={tagsList}/> */}
          <div className="tags-input">
                    <ul id="tags">
                        {tags.map((tag, index) => (
                            <li key={index} className="tag">
                                <span className='tag-title'>{tag}</span>
                                <span className='tag-close-icon'
                                    onClick={() => removeTags(index)}
                                >
                                    x
                                </span>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        onKeyUp={event => event.key === "," ? addTags(event) : null}
                        placeholder='Seperate tags using "," '
                    />
                </div>
      
      
      
      </Grid>

      <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>

      </Grid>

</form>
      </Paper>
     
    </div>
  );
}

export default Create;
