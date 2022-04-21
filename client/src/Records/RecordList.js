import React from 'react'
import RecordSummary from "./RecordPanel";
import { Link } from "react-router-dom";


const RecordList = ({ records }) => {
    //to showcase all the records on the collection
    return (
        <div>RecordList
            <div>
                {records && records.map(record => {
                    
                    return (
                        <Link to={"/record/" + record.id} key={record.id}>
                            <RecordSummary record={record} />
                        </Link>
                        
                    )
                })}


            </div>
        </div>
    )
}
export default RecordList;