import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, lighten } from '@mui/system';
import { getAllUsers } from '@/apiRequests/users/getAllUsers';

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

export default function RoleAutoComplete({ selectedRole, roleSelectedCallback }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      const users = await getAllUsers();      
      console.log('-- GETTING USERS --')
      console.log(users)

      if (active) {
        setOptions(
          users[1].map((option) => {
            const firstLetter = option.firstname[0].toUpperCase();
            const displayLabel =
              option.firstname.toLowerCase() === 'admin' && option.lastname.toLowerCase() === 'admin'
                ? 'Admin'
                : `${option.firstname} ${option.lastname}`;
            return {
              firstLetter: displayLabel === 'Admin' ? '0' : firstLetter,
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

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelection = (event, value) => {
    roleSelectedCallback(value);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      value={selectedRole || null}
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
          label="Role"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}