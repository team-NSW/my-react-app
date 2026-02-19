import React from 'react';

type CircleProps = {
    size?: number;
    color: string;
};

// const colorMap: Record<CircleProps['color'], string> = {
//     blue: 'bg-blue-500',
//     red: 'bg-red-500',
//     green: 'bg-green-500',
//     yellow: 'bg-yellow-500',
// };

const Circle: React.FC<CircleProps> = ({size = 50, color = 'blue'}) => {
    return (
        <div
            className= 'rounded-full'
            style={{ width: `${size}px`,
                     height: `${size}px`,
                     backgroundColor: color }}
        />
    );
};

export default Circle;