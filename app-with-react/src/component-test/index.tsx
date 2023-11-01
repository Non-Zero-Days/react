import React, { FC } from 'react';

interface Props {
    displayText: string;
}

const ComponentTest : FC<Props> = ({displayText}) => {
    return <div>
        <h1>You can reuse this all over the place and it's super cool</h1>
        <h2>{displayText}</h2>
    </div>
}

export default ComponentTest;