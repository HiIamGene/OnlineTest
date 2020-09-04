import React from "react"
import { withRouter } from 'next/router'



const MenuItem = ({children,active,url,router}) => {
    const classes = active ? "active":"";
    return(
        <div style={{height:"100%"}}>
            <button onClick={()=>{
                router.push(url)
            }} className={"menu-link cloud-light " + classes}>
                {children}
                {active && <i className={"mini-pointer"}/>}

            </button>

            <style jsx>{`

                .menu-link{
                  height: 100%;
                  background-color: #ffffff;
                  color: black;
                  padding-left: 15px;
                  padding-right: 15px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  text-decoration: none;
                  border-right: solid 1px #8e8e8e3b;
                  cursor: pointer;
                  transition: all .3s ease-in-out;
                  border-left: none;
                  border-bottom: none;
                  border-top: none;
                  font-size: 12.8px ;
                }

                .menu-link:hover{
                  background-color: #f5f6f7;
                }

                .menu-link.active{
                  font-family: "Cloud";
                  color: $primary;
                }

                .mini-pointer{
                  position: absolute;
                }

                .mini-pointer:after{
                  position: relative;
                  bottom: -37.8px;
                  height: 0;
                  border: 7px solid transparent;
                  border-top-color: white;
                  content: "";
                }

            `}</style>
        </div>

    )
}

export default withRouter(MenuItem)