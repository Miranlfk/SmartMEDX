import React from "react";
import moment from "moment";

const patientRecords = ({ record }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title ">{record.firstName} {record.lastName}</span>
                <p>
                    Posted by Dr {record.firstName} {record.lastName}
                </p>
                <p className="grey-text">
                    {record.createdAt
                        ? moment(record.createdAt.toDate()).calendar()
                        : "-"}
                </p>
            </div>
        </div>
    );
};

export default patientRecords;