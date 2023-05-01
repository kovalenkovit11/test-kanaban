import axios from "axios";


export const getIssues = (searchQuery: string)=>{
    axios.get(`https://api.github.com/repos/${searchQuery}/issues?state=all`)
      
      
      .then(response=> response.data );
      
      
  }