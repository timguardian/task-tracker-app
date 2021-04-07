import { useState } from 'react'
import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState(new Date())
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day: moment(day).format('YYYY-MM-DD HH:mm'), reminder })

    setText('');
    setDay(new Date());
    setReminder(false);
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <TextField variant="outlined" label="Title" value={text} onChange={(e) => setText(e.target.value)} style={{width: '100%'}} />
      </div>
      <div className='form-control'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            autoOk
            variant="inline"
            ampm={false}
            inputVariant="outlined"
            label="Day & Time"
            value={day}
            onChange={setDay}
            format="yyyy-MM-dd HH:mm"
            style={{width: '100%'}}
          />
        </MuiPickersUtilsProvider>
      
      </div>
      <div className='form-control form-control-check'>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={reminder}
                color="primary"
                onChange={(e) => setReminder(e.target.checked)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Set Reminder"
          />
        </FormGroup>
      </div>
      <Button
      type="submit"
        variant="contained"
        size="large"
        style={{width: '100%', backgroundColor:'#6fbf73'}}
        startIcon={<SaveIcon />}
      >
        Save Task
      </Button>
    </form>
  )
}

export default AddTask
