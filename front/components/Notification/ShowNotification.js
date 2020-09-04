import React, {Component} from 'react';
const ShowNotice1 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
                <div className={"n-detail"}>
                    <n>Draco Malfoy</n> endorsed your <b>Profile</b>
                    <div><small>20 mins ago</small></div>
                </div>    
            <div className={"notice-detail"}>
                    <img src="https://www.sataban.com/wp-content/sabai/File/files/a732ec5f49b49b9906e3a98fdadc84f5.png" alt="graduated"/>
            </div>
                <div className={"n-detail"}>
                        <b>Sainumpeung School</b>
                        <div> Sci-math </div>
                        <div>
                                <img className={"logo-small"} src="/static/images/icon/AW_CrewHitz_ICON-71.png" alt="graduated"/>
                                <small> 200 people Endorsed</small>
                        </div>
                </div>
            
            
        </div>
    )
}
const ShowNotice2 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
                <div className={"n-detail"}>
                    <n>Draco Malfoy</n> endorsed your <b>Profile</b>
                    <div><small>20 mins ago</small></div>
                </div>
            <div className={"notice-detail"}>
                    <img src="https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/18424272_1478702912161500_2883852630214361429_n.png?_nc_cat=1&_nc_oc=AQl9LS7jr8PAYvsuYcEOTlotBCLGC3crHx3AEmMJMdYDZ7yEkKWj_yc17u0I7aNKoqQ&_nc_pt=1&_nc_ht=scontent.fphs1-1.fna&oh=402a7c505245a381d02acf260f697a5c&oe=5D89643F" alt="graduated"/>
            </div>
                <div className={"n-detail"}>
                        <b>Suandusit University</b>
                        <div> General Manager at Hotel </div>
                        <div>
                                <img className={"logo-small"} src="/static/images/icon/AW_CrewHitz_ICON-71.png" alt="graduated"/>
                                <small> 200 people Endorsed</small>
                        </div>
                </div>    

        </div>
    )
}
const ShowNotice3 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
            <div className={"n-detail"}>
                    <n>Draco Malfoy</n>
                    <h> has invite you to an </h> 
                        <b>
                          Event <img className={"logo-small"}src="/static/images/icon/AW_CrewHitz_ICON-09.png" alt="Event"/>
                        </b>         
                    <div><small>30 mins ago</small></div>

                        <div  className={"n-describe"}>
                        <img src="https://c1.sfdcstatic.com/content/dam/blogs/ca/Blog%20Posts/shake-up-sales-meeting-og.jpg" alt="meeting"/>
                      </div>                        
                                <p className={"n-detail"} style={{marginLeft:"50px"}}>
                                    <n>Captain Meeting</n>
                                    <div>
                                        <small style={{marginLeft:"45px"}}>
                                            <img className={"logo-small"} src="https://www.trollbeads.com/on/demandware.static/Sites-Trollbeads_CountrySelector-Site/-/default/dw8475af3c/images/google-location-icon-turJBT-clipart.png" alt="Location"/>
                                            National Dock,Sutahip
                                        </small>
                                    </div>                                
                                    <div><small style={{marginLeft:"60px"}}>Date xx/xx/xxxx</small></div>
                                    <div><small style={{marginLeft:"60px"}}>time : 08.30 pm</small></div>
                                </p>


                    
            </div>


                <button className = "btn-n-blue"> Accpept </button>
                <button className = "btn-n-red"> Decline</button>

        </div>
                
    )
}
const ShowNotice4 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
            
                <div className={"n-detail"}>
                    <n>Draco Malfoy</n> has accept your request in <b>chat group of</b> Event <b>Captain</b>
                    <div>
                        <b> Meeting </b>
                        <img className={"logo-small"} src="/static/images/icon/AW_CrewHitz_ICON-04.png" alt="graduated"/>
                    </div>
                    <div><small>20 mins ago</small></div>
                </div>             
        </div>
    )
}
const ShowNotice5 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
            
                <div className={"n-detail"}>
                    <n>Draco Malfoy</n> has accept your request in <b>chat group of</b> Event <b>Captain</b>
                    <div>
                        <b> Meeting Party </b>
                        <img className={"logo-small"} src="/static/images/icon/AW_CrewHitz_ICON-04.png" alt="graduated"/>
                    </div>
                    <div><small>20 mins ago</small></div>
                </div>             
        </div>
    )
}
const NoticeTopic =({t}) =>{
    return(
        <div className="notice-log">
        <img className={"notice-pic-topic"} src="/static/images/icon/AW_CrewHitz_ICON-23.png" alt="topic-edu"/>
        <b className={"n-detail"}> Education</b>
        </div>

    )
}
export {ShowNotice1}
export {ShowNotice2}
export {ShowNotice3}
export {ShowNotice4}
export {ShowNotice5}
export {NoticeTopic}