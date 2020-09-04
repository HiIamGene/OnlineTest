import React from 'react'
import {NavItem} from "reactstrap"
import Link from 'next/link';
import {WIDTH_BREAKPOINT} from "../../constant/responsive"

export default ({noLine,children,style,mr0,className = "",link = '/'}) =>(
    <NavItem>
        <Link href={link}>
        <div className={"nav-link " + className} style={{
            ...style,
            ...(noLine)? {}: {borderRight: "solid 1px"},
            display:"-webkit-inline-box"
        }}>
            {children}
        </div>
        </Link>

        <style jsx>{`
            .nav-link{
                color: #fff !important;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }

            @media only screen and (max-width: ${WIDTH_BREAKPOINT-1}px)  {
                .nav-link{
                    padding-right: 0 ;
                  }
             }
        `}</style>
    </NavItem>
)