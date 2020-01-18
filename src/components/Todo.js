import React from 'react';

const Todo = (prop) => {
    debugger
    console.log('aaaaaa');
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