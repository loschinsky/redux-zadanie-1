import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  completeTask,
  taskDeleted,
  titleChanged,
  getTasks,
  loadTasks,
  getTaskLoadingStatus,
  createTask,
} from './store/task'
import { getError } from './store/errors'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]
const store = configureStore()
const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTaskLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadTasks())
  }, [])
  const addNewTask = () => {
    dispatch(
      createTask({ userId: 1, title: 'Some New Task', completed: false }),
    )
  }
  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <div>{error}</div>
  }
  return (
    <>
      <h1>App</h1>
      <button onClick={addNewTask}>Add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change tittle</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
