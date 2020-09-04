import React from 'react';


const Card = ({children,title,topRight,noPadding,noMargin,noPadding_bottom,isTimeLine}) => {
    return (

        <div>

            <div className = {"card-create"}>
                {title&& (
                    <div className={"title"}>
                        <h6 className={"mb-3"}><b>{title}</b></h6>
                        {topRight}
                    </div>
                )}
                {children}
            </div>

            <style jsx>{`
                .card-create{
                  padding: ${noPadding ? 0 : "1em" };
                  padding-bottom:${noPadding_bottom ? 0 : "1em" };
                  margin-bottom: ${noMargin ? 0 : "1em" };
                  z-index: ${isTimeLine ? 6 : 1};
                }
            `}</style>
        </div>

    );
};

export default Card;