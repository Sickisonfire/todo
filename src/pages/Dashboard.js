import { useState, useEffect } from 'react'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Dashboard = () => {
  const [createListState, setCreateListState] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const [lists, setLists] = useState([])
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  const handleItemInputChange = (e) => {
    const { value } = e.target
    setTitleInput(value)
  }

  const handleClickAddList = (e) => {
    e.preventDefault()
    setCreateListState(true)
  }

  const handleAddList = (e) => {
    e.preventDefault()
    const newList = { title: titleInput, id: Date.now() }

    setLists([...lists, newList])

    setCreateListState(false)
    setTitleInput('')
  }

  const handleRemoveList = (id) => {
    const newListState = lists.filter((list) => list.id !== id)
    const newTodoState = todos.filter((todo) => todo.listId !== id)
    setLists(newListState)
    setTodos(newTodoState)
  }

  const handleAddItemToList = (todo) => {
    setTodos([...todos, todo])
  }

  const handleRemoveItemFromList = (todoId) => {
    const newTodoState = todos.filter((todo) => todo.id !== todoId)
    setTodos(newTodoState)
  }

  const handleMoveTodo = (newTodos) => {
    setTodos([...newTodos])
  }

  useEffect(() => {
    if (loading) {
      if (localStorage.getItem('lists') !== null) {
        setLists(JSON.parse(localStorage.getItem('lists')))
        setTodos(JSON.parse(localStorage.getItem('todos')))
      }
      setLoading(false)
    }

    localStorage.setItem('lists', JSON.stringify(lists))
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [lists, todos, loading])

  return (
    <div tw='right-0 left-0 bottom-0 top-16 p-4 absolute sm:flex items-start '>
      {lists &&
        lists.map((list) => (
          <List
            key={list.id}
            id={list.id}
            title={list.title}
            todos={todos}
            removeList={handleRemoveList}
            removeItemFromList={handleRemoveItemFromList}
            addItemToList={handleAddItemToList}
            moveTodos={handleMoveTodo}
          />
        ))}
      {createListState ? (
        <form tw='w-72 bg-white  text-sm text-gray-700 p-2  rounded-lg text-left'>
          <input
            onChange={handleItemInputChange}
            tw='p-2 bg-gray-500 bg-opacity-10 rounded shadow text-sm mb-2 w-full'
            type='text'
            placeholder='input title here...'
            value={titleInput}
          />
          <div tw='flex'>
            <button onClick={handleAddList} tw='bg-indigo-500 text-white rounded py-1 px-3 mr-2'>
              Add
            </button>
            <button
              onClick={() => {
                setCreateListState(false)
                setTitleInput('')
              }}
              tw='h-full hover:(bg-gray-300 bg-opacity-20) py-1 px-3 rounded'
            >
              <FontAwesomeIcon icon='times' tw='text-gray-600' />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleClickAddList}
          tw=' mb-4 w-full sm:w-72 bg-gray-400 bg-opacity-20 hover:bg-opacity-40 text-sm text-gray-700 p-2 pl-4 rounded-lg text-left'
        >
          <FontAwesomeIcon icon='plus' tw='mr-1' /> Add new list
        </button>
      )}
    </div>
  )
}

const List = ({ title, id, removeList, addItemToList, removeItemFromList, todos, moveTodos }) => {
  const [createItemState, setCreateItemState] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const [hoverState, setHoverState] = useState(false)
  const [dragHoveredState, setDragHoveredState] = useState(false)

  const handleItemInputChange = (e) => {
    const { value } = e.target
    setTitleInput(value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setCreateItemState(true)
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const newItem = { title: titleInput, id: Date.now(), listId: id }
    addItemToList(newItem)
    setCreateItemState(false)
    setTitleInput('')
  }

  const onDragOverHandler = (e) => {
    if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
      e.preventDefault()
      setDragHoveredState(true)
    }
  }

  const onDropHandler = (e) => {
    const todoId = e.dataTransfer.getData('text/plain')
    const newTodoState = todos
    const index = newTodoState.findIndex((todo) => todo.id === +todoId)
    newTodoState[index].listId = id
    moveTodos(newTodoState)
    setDragHoveredState(false)
  }
  return (
    <div
      onDragLeave={() => setDragHoveredState(false)}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => onDropHandler(e)}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      css={[
        tw`mb-4 p-2 bg-white  sm:w-72 rounded-lg mr-2 max-h-full flex flex-col relative w-full`,
        dragHoveredState && tw`bg-gray-100`,
      ]}
    >
      {hoverState && (
        <button
          onClick={() => removeList(id)}
          tw='absolute top-1 right-2 hover:bg-gray-100 p-1 px-3 rounded'
        >
          <FontAwesomeIcon icon='times' tw='text-gray-600 ' />
        </button>
      )}
      <h2 tw='text-sm font-bold mb-2 mx-2 text-gray-700'>{title}</h2>
      <div tw='overflow-y-auto overflow-x-hidden'>
        {todos &&
          todos
            .filter((todo) => id === todo.listId)
            .map((item) => (
              <ListItem
                id={item.id}
                key={item.id}
                title={item.title}
                removeItem={(itemId) => removeItemFromList(itemId)}
              />
            ))}
      </div>
      {createItemState ? (
        <form tw='w-full'>
          <input
            onChange={handleItemInputChange}
            tw='p-2 bg-gray-500 bg-opacity-10 rounded shadow text-sm mb-2 w-full'
            type='text'
            placeholder='input task here..'
            value={titleInput}
          />
          <div tw='flex'>
            <button onClick={handleAddItem} tw='bg-indigo-500 text-white rounded py-1 px-3 mr-2'>
              Add
            </button>
            <button
              onClick={() => {
                setCreateItemState(false)
                setTitleInput('')
              }}
              tw='h-full hover:(bg-gray-300 bg-opacity-20) py-1 px-3 rounded'
            >
              <FontAwesomeIcon icon='times' tw='text-gray-600' />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={(e) => handleClick(e)}
          tw='text-sm text-gray-500 bg-gray-300 bg-opacity-0 hover:bg-opacity-20 p-2 pl-3  flex items-center w-full rounded '
        >
          <FontAwesomeIcon icon='plus' tw='mr-1' />
          Add Item
        </button>
      )}
    </div>
  )
}

const ListItem = ({ title, removeItem, id }) => {
  const [hoverState, setHoverState] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e)}
      tw='w-full text-left mb-2 relative'
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <div tw='p-2 bg-gray-500 bg-opacity-10 rounded shadow hover:bg-opacity-20 text-sm '>
        {hoverState && (
          <button
            onClick={() => removeItem(id)}
            tw='absolute top-1 bg-red-400 hover:bg-red-600 right-1 p-1 px-3 rounded'
          >
            <FontAwesomeIcon icon='times' tw='text-white' />
          </button>
        )}
        {title}
      </div>
    </div>
  )
}

export default Dashboard
