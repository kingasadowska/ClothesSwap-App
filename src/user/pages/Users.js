import React from 'react';
import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [{
        id: '1',
        name: 'Kelly',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TechCrunch_Disrupt_NY_2016_-_Day_3_%2826884815511%29_%28cropped%29.jpg/1200px-TechCrunch_Disrupt_NY_2016_-_Day_3_%2826884815511%29_%28cropped%29.jpg',
        clothes: 2
    },
    {
        id: '1',
        name: 'Kelly',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TechCrunch_Disrupt_NY_2016_-_Day_3_%2826884815511%29_%28cropped%29.jpg/1200px-TechCrunch_Disrupt_NY_2016_-_Day_3_%2826884815511%29_%28cropped%29.jpg',
        clothes: 2
    }]
    return <UsersList items= {USERS}/>
};

export default Users;