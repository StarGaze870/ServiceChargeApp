import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Slide from '@mui/material/Slide';
import { Alert, AlertTitle, Box, FormControlLabel, Switch } from '@mui/material';

const SucessSlide = memo(({toggleShow=false, message='Message', hrefPath='/', queryDataJSON}) => {
  const [checked, setChecked] = useState(toggleShow);  

  useEffect(() => {
    setChecked(toggleShow);
  }, [toggleShow])

  return (
    <div className='position-fixed end-0 me-3 bottom-0 mb-3'>      
      <Slide direction={toggleShow ? 'right' : 'up'} in={checked} mountOnEnter unmountOnExit>
        <Box>
          <Link             
            href={{
              pathname: hrefPath,
              query: queryDataJSON,
            }}
            className='text-decoration-none' 
            target="_blank">

            <Alert severity="success">
              <AlertTitle className=''>Success</AlertTitle>
              {message} — <strong className='text-success'>check it out!</strong>
            </Alert>
          </Link>
        </Box>
      </Slide>
    </div>
  );
})

export default SucessSlide;
