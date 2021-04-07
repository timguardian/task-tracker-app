import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width:'500px'
  }
});

const protocol = "http";
const host = "api.sa.homework";
const port = 80;

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();

  const apiUrl = protocol + "://" + host + ":" + port;

  useEffect(() => {
    console.log(isServiceAlive());
    /*const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()*/
  });

  const fetchTasks = async () => {
    const res = await fetch(apiUrl + '/tasks')
    const data = await res.json()

    return data
  }

  const isServiceAlive = async () => {
    const res = await fetch(`${apiUrl}/health`)
    const data = await res.json()
    return data
  };

  const fetchTask = async (id) => {
    const res = await fetch(`${apiUrl}/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch(apiUrl + '/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    const res = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'DELETE',
    })
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
      <Card className={classes.root}>
        <CardContent>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: 10 }}>No Tasks To Show</div>
              )}
            </>
          )}
        />
        </CardContent>
      </Card>
      </div>
    </Router>
  )
}

export default App
