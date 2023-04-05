import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Van Henry' },
    { id: 3, name: 'April Tucker' },
    { id: 4, name: 'Ralph Hubbard' },
    { id: 5, name: 'Omar Alexander' },
    { id: 6, name: 'Carlos Abbott' },
    { id: 7, name: 'Miriam Wagner' },
    { id: 8, name: 'Bradley Wilkerson' },
    { id: 9, name: 'Virginia Andrews' },
    { id: 10, name: 'Kelly Snyder' },
    { id: 11, name: 'Diana Prince' }
  ];

export default function UserSelect({selectedUser, userSelectedCallback}) {    
    
    // VARIABLES
    const [user, setUser] = useState(selectedUser === null ? { id: 1, name: 'Admin' } : selectedUser);
  
    useEffect(() => {

        setUser(selectedUser);

    }, [selectedUser])

    useEffect(() => {

        // TODO: GET USERS LIST
        // id: 1
        // name: admin        

    }, [])

    const handleChange = (event) => {
        const selectedUser = JSON.parse(event.target.value);
      
        // Call the userSelectedCallback with the selected user object
        userSelectedCallback(selectedUser);
      
        // Update the state with the selected user
        setUser(selectedUser);
      };
      

  return (
    <div className='mt-4'>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label">User</InputLabel>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={JSON.stringify({ id: user.id, name: user.name })}
            onChange={handleChange}
            input={<OutlinedInput label="User" />}
            MenuProps={MenuProps}
          >
            {names.map(({ id, name }) => (
              <MenuItem
                key={id}
                value={JSON.stringify({ id, name })}
              > 
                {name}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    </div>
  );
}
