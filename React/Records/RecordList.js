import React from 'react'
import RecordSummary from "./RecordSummary";
import { Link } from "react-router-dom";

const RecordList = ({ records }) => {
    return (
        <div>RecordList
            <div>
                {records && records.map(record => {
                    
                    return (
                        <Link to={"/record/" + record.id} key={record.id}>
                            <RecordSummary record={record}  />
                         </Link>
                        
                    )
                })}


            </div>
        </div>
    )
}
export default RecordList;