import {useState,useEffect} from 'react';

const useFetch = (url) =>
{
    const [data,setData]=useState(null);
    const [isPending, setIsPending]=useState(true);
    const [error, setError]=useState(null);

    useEffect(() => {

      const abortCont = new AbortController();

        setTimeout( ()=>   //setTimeout just creates a 1 sec time lag to show the loading screen   
        {
          fetch(url, { signal:abortCont.signal }) //returns a promise with response object
            .then((res) => {
              if(!res.ok){
                throw Error("Data could not be fetched")
              }
              return res.json();
            })
            .then((data) =>{
              setData(data);
              setIsPending(false);
            })
            .catch(err=>{
              if(err.name==='AbortError')
              {
                console.log('Fetch Aborted');
              }
              else
              {
                setError(err.message); //To show error on the page save it in a state
                setIsPending(false);
              }
              
            });
        },1000);

        return ()=>abortCont.abort();

      },[url]);

return {data,isPending,error};

}

export default useFetch;