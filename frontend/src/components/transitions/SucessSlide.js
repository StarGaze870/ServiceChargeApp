import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Slide from '@mui/material/Slide';
import { Alert, AlertTitle, Box } from '@mui/material';

const SucessSlide = memo(({toggleShow=false, title='Success', message='Message', hrefPath='/', queryDataJSON, disableLink=false, severity='success'}) => {
  const [checked, setChecked] = useState(toggleShow);  

  useEffect(() => {
    setChecked(toggleShow);
  }, [toggleShow])

  return (
    <div className='position-fixed end-0 me-3 bottom-0 mb-3'>      
      <Slide direction={toggleShow ? 'right' : 'up'} in={checked} mountOnEnter unmountOnExit>
        <Box>
          {disableLink ? (
            <Alert severity={severity}>
              <AlertTitle className=''>{title}</AlertTitle>
              {message}
            </Alert>
          ) : (
            <Link
              href={{
                pathname: hrefPath,
                query: queryDataJSON,
              }}
              className='text-decoration-none' 
              target="_blank">

              <Alert severity={severity}>
                <AlertTitle className=''>{title}</AlertTitle>
                {message} — <strong className='text-success'>check it out!</strong>
              </Alert>
            </Link>
          )}
        </Box>
      </Slide>
    </div>
  );
})

export default SucessSlide;
