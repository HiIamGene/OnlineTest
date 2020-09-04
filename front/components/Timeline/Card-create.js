import React from 'react';


const Cardcreate = ({children,title,topRight,noPadding,isTimeLine}) => {
    return (

        <div>

            <div className={"card-create"}>
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
                  zIndex: ${isTimeLine ? 6 : 6};
                }
            `}</style>
        </div>

    );
};

export default Cardcreate;