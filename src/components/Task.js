import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <div style={{ display: 'flex' }}>
          {
            task.reminder ? 
              <IconButton color="primary" aria-label="alarmOn">
                <AlarmOnIcon/>
              </IconButton> : ""
          }
          <IconButton style={{color: 'red'}} aria-label="delete" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
