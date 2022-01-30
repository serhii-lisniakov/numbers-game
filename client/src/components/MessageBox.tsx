import React from 'react';

type Props = {
    message: string;
    state?: boolean;
}

export const MessageBox: React.FC<Props> = ({message, state = true}) => {
    return (
        <span style={{
            color: state ? 'green' : 'red',
        }}>{message}</span>
    )
}
