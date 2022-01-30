import { useState, useEffect } from 'react';
import Details from './Details';

export default function List () {
    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LIST_URL}users.json`)
        .then(response=>response.json())
        .then(users => setList(users))
    }, []);

    const showDetails = (evt) => {
        const newUser = {
            id: evt.target.dataset.id,
            name: evt.target.textContent,
        }
        setUser(prevUser => prevUser && prevUser.id === newUser.id ? prevUser : newUser);
    }

    return (
        <div className='container'>
            <ul className='list'>
                {list?.map((o) => <li key={o.id} data-id={o.id} className='listItem' onClick={showDetails}>{o.name}</li>)}
            </ul>
            {user && <Details info={user} />}
        </div>
    )
}