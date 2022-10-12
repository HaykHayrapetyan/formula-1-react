import {Box, FormControlLabel, Switch} from '@mui/material';

const Switcher = ({handler, labelName}) => {
    return (
        <Box>
            <FormControlLabel label={labelName ? 'drivers' : 'teams'} control={<Switch onChange={handler}/>}/>
        </Box>
    )
}

export default Switcher;