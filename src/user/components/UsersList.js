import React from 'react';
import './UsersList.css';
import UsersItem from './UserItem';

const UsersList = props => {
    if (props.items.length === 0) {
      return (
        <div className="center">
          <h2>No users found.</h2>
        </div>
      );
    }

return ( 
  <ul className="users-list">
    {props.items.map(user => (
        <UsersItem 
        key={user.id} 
        id={user.id} 
        image={user.image} 
        name={user.name} 
        clothesCount={user.clothes}/>
        ))}
    </ul>
  );
};

export default UsersList;