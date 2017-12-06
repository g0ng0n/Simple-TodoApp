import React from 'react';
import {partial} from '../../lib/utils';

export const TodoItem = (props) => (
  const handleToogle = partial(props.handleToogle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  return (
    <li >
      <span className='delete-item'> <a href="#" onClick={handleRemove}> X </a> </span>
      <input type="checkbox" onChange={handleToogle} checked={props.isComplete}/> {props.name}
    </li>
  )
)

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired,
}
