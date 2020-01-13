import React from 'react';

const Todo = (prop) => {
    const isArchived = prop.isArchived === true ? 'checked' : 'not checked'
    return (
        <div key={prop} className='todo'>
            <div className='todoContent'>
                {prop.content}
            </div>
            <button onClick={prop.toggleArchive} className='todoArchived'>
                {isArchived}
            </button>
        </div>
    );
}

export default Todo;