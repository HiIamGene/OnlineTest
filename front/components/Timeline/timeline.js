import React from 'react';


const Feed = ({children,title,topRight,noPadding,noPadding_bottom,noMargin_top}) => {
    return (
        <div>
            <div className={"card"}>
                {title&& (
                    <div className={"title"}>
                        <h6 className={"mb-3"}><b>{title}</b></h6>
                        {topRight}
                    </div>
                )}
                {children}
            </div>
            <style jsx>{`
                .card{
                  padding: ${noPadding ? 0 : "1em" };
                  padding-bottom: ${noPadding_bottom ? 0 : "1em" };
                  border: none;
                  margin-bottom: 20px;
                }
            `}</style>
        </div>

    );
};

export default Feed;