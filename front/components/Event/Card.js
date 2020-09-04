import React from "react";

const Card = ({ children, title, topRight, noPadding }) => {
  return (
    <div>
      <div className={"timeline-card"}>
        {title && (
          <div className={"title"}>
            <h6 className={"mb-3"}>
              <b>{title}</b>
            </h6>
            {topRight}
          </div>
        )}
        {/* <hr
              style={{
                height: 0.5,
                marginTop: 0,
                marginBottom: 0,
                backgroundColor: 'lightgray'
              }}
            /> */}
        {children}
        
      </div>

      <style jsx>{`
        .title {
          display: flex;
          justify-content: space-between;
        }
        .timeline-card {
          background-color: white;
          padding: ${noPadding ? 0 : "1em"};
          padding-bottom: 2em;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

export default Card;
