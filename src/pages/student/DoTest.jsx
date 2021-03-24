import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
function DoTest(props) {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };

    const onChange = (current) => {
        setCurrent(current);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div className="steps-action">
            {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
            )}
            {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            )}
            {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
            )}

        </div>)
}

export default DoTest;