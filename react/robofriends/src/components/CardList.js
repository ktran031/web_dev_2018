import React from 'react';
import Card from './Card';

const CardList = (props) => {
    const { robots } = props;
    const cardArray = robots.map((user, i) => {
        const {id, name, email} = robots[i];
        return  <Card key={id}
                     id={id}
                     name={name}
                     email={email}
                />
        });

    return (
        <div>
            {cardArray}
        </div>
    );
};

export default CardList;