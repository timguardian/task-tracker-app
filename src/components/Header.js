import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Fab from '@material-ui/core/Fab';

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()
  
  let button = <Fab color="primary" aria-label="add" onClick={onAdd}>
                  <AddIcon />
                </Fab>;
  
  if(showAdd){
    button = <Button color="primary" aria-label="back" onClick={onAdd}>
                <ArrowBackIosOutlinedIcon />
                <span>Back </span>
              </Button>
  }
  
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        button
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
