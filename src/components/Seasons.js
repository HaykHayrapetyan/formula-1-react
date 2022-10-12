import Button from '@mui/material/Button';

const Seasons = ({data, handler}) => { 
    return (
        <div className='Seasons'>
            {data.map(season => <Button variant="outlined" onClick={handler} key={season}>{season}</Button>)}
        </div>
    )
}

export default Seasons;