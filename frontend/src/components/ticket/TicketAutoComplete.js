import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, lighten } from '@mui/system';
import { getAllUsers } from '@/apiRequests/users/getAllUsers';
import { getAllTickets } from '@/apiRequests/tickets/getAllTickets';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: 'black',
  backgroundColor: lighten('rgb(100, 100, 255)', 0.9),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function TicketAutoComplete({ selectedTicket=null, userSelectedCallback }) {
  
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [ticketDefaultValue, setTicketDefaultValue] = useState(selectedTicket);

  useEffect(() => {
      setTicketDefaultValue(selectedTicket);
  }, [selectedTicket])

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      const tickets = await getAllTickets();      
      console.log('-- GETTING TICKETS --')
      console.log(tickets)

      if (active) {
        setOptions(
          tickets[1].map((option) => {
            const firstLetter = option.subject[0].toUpperCase();
            const displayLabel = option.subject;

            return {
              firstLetter: firstLetter,
              displayLabel,
              ...option,
            };
          })
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelection = (event, value) => {
            
    userSelectedCallback(value);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}    
      value={ticketDefaultValue || null}  
      onChange={handleSelection}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.displayLabel}
      loading={loading}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ticket"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}