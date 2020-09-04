const AboutSidebarComponent = ({icon , active , currentData , title , onClick }) => (
    <div onClick={onClick} className="containerAboutSidebar">
        <div className="about-sidebar-container-icon">
            {icon}
        </div>
        
        <div className="about-sidebar-container-title">
            <p className="about-sidebar-position about-sidebar-title">{title}</p>
        </div>
        <div className="">
            <p className="about-sidebar-position currentDataAboutSidebar">
                {currentData}
            </p>
        </div>
        <style jsx>{`

            .containerAboutSidebar{
                border-bottom : ${active  ?   "2px solid #0F143A" : "2px solid #ffffff"};
                color: ${active  ?   "#0F143A" : "#AFAFAF"} !important;
                border-spacing: 0;
                ${active  ? "font-weight : bold;" : ""}
                display : flex;
                font-family: ${active ? "Cloud" : "Cloud Light" };
                position : relative;
                flex: auto;
                align-content : stretch;
               
                padding : 15px 50px 15px 50px;
                justify-content : space-between;
                align-items  : center;
                box-sizing:border-box;
                cursor : pointer;
                padding-bottom: 5px;
                transition :  all .3s;
            }
            .containerAboutSidebar:hover{
                border-bottom : ${active  ?   "2px solid #0F143A" : "2px solid #ffffff"};
                padding-bottom: 5px;
                
                transition : height .1s,  border-bottom .1s , padding-bottom 0.1s;
            }
            .containerAboutSidebar:hover > .iconAboutSidebar{
                current-color  : red;
            }
            .containerAboutSidebar:hover > .containerTitleAboutSidebar > .titleAboutSidebar {
                transition : color .2s;
                font-weight: bold;
                color: #212121;
            }
            .currentDataAboutSidebar{
               color : ${active ? "#0F143A":"#C46367"};
               font-family: "Cloud";
               font-size: .8em;
            }
        `}</style>
    </div>
)

export default AboutSidebarComponent