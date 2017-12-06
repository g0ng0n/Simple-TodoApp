import { addTodo, findById, toogleTodo, updatedTodo } from './todoHelpers';

test('addTodo should add the passed todo to the list', () =>{
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
  ]
  const newTodo ={id:3, name: 'three', isComplete: false}
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false},
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).toEqual(expected)
})

test('addTodo should not mutate the existing todo array', () =>{
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
  ]
  const newTodo ={id:3, name: 'three', isComplete: false}
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false},
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).not.toBe(startTodos)
})

test('findById should return the expected item from an array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false},
  ]
  const expected = {id:2, name: 'two', isComplete: false}

  const result = findById(2, startTodos)

  expect(result).toEqual(expected);

})

test('toogleTodo should toogle the isComplete prop of todo', () => {
  const startTodos = {id:2, name: 'two', isComplete: false}
  const expected = {id:2, name: 'two', isComplete: true}

  const result = toogleTodo(startTodos)

  expect(result).toEqual(expected);
})

test('toogleTodo should not mutate the original todo', () => {
  const startTodos = {id:2, name: 'two', isComplete: false}

  const result = toogleTodo(startTodos)

  expect(result).not.toBe(startTodo);
})

test('updateTodo should update an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false},
  ]
  const updatedTodo = {id: 2, name: 'two', isComplete: true}

  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false},
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).toEqual(expectedTodos);
})

test('updateTodo should not mutate the existing todo array', () =>{
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false},
  ]
  const updatedTodo = {id: 2, name: 'two', isComplete: true}

  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false},
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).not.toBe(expectedTodos)
})
