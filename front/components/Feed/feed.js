import React from 'react';


const Feed = ({children,title,topRight,noPadding,noPadding_bottom}) => {
    return (
        <div className={"status-feed"}>
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
                }
            `}</style>
        </div>

    );
};

export default Feed;