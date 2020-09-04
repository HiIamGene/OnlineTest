import React from 'react';
import { notDeepEqual } from 'assert';

const Icon = ({icon,size = 1,color = "white",className = ""}) => {
    /*
        คือมันเป็นไฟล์ png แล้วการที่จะแก้ไขค่าสีต้องใช้ bright กับ hue  filter : brightness(5) hue-rotate(864deg)  แล้วแก้ค่า bright กับ hue ไปเรื่อยๆ จนกว่าจะเจอสีที่ ใช้
        ถ้ามีวิธีไหนดีกว่านี้ก็แก้ไขได้เลยนะครับ
    */

    const colors = {
        white:{filter: "brightness(100)"}
    }
    return (
        <i className={className}>
            <img src={`/static/images/icon/${icon}.png`} alt=""
                 style={{
                     // width:`${size}em`,
                     height:`${size}em`,
                     ...colors[color],
                 }}/>

            <style jsx>{`

            `}</style>
        </i>
    );
};

export default Icon;