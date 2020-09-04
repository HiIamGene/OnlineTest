import React from 'react';

const SeeMore = ({text,onClick}) => {
    return (
        <div>
            <button className={" btn btn-block btn-events-create"} onClick={onClick}>{text}</button>
            <style jsx>{`
                .btn-events-create{
                    margin-top:10px;
                    margin-bottom:10px;
                    background-color:#efefef;
                    transition: all .2s ease-in-out;
                    font-family: "Cloud";
                    color: #31a7d7;
                    cursor: pointer;
                    line-height: 1.2;
                    font-size: 12.8px;
                    transition: 0.5s;
                }
                .btn-events-create:hover{
                    transform: scale(1.02);
                    transition: 0.5s;
                }

            `}</style>
        </div>
    );
};

export default SeeMore;