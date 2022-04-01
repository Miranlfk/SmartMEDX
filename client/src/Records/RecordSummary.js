import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const RecordSummary = ({ record }) => {
    return (
        <div>
            

            <div class="center">
                <div className="row" style={{ paddingLeft: "550px" }}>
                    <div class="col s12 m7" >
                        
                        <div class="card-panel green accent-4" style={{ borderRadius: "12px" }} >
                            <div class="card-image">
                                <i class="large material-icons">assignment</i>

                            </div>
                            <span class="card-title">HEALTH RECORDS</span>
                            <div class="card-content">
                                <h5>Access to your Diagnosis records and laboratary Records</h5>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordSummary;