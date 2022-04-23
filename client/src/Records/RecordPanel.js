import React from "react";

//to display panel of the Health Records
const RecordSummary = ({ record }) => {
    return (
        <div>
            

            <div class="center">
                <div className="row" >
                    <div class="col s12 m7" >
                        
                        <div class="card-panel grey darken-4 z-index 1" style={{ borderRadius: "12px" }} >
                            <div class="card-panel-image">
                                <i class="large material-icons">assignment</i>
                            </div>

                            <span class="card-panel-title">HEALTH RECORDS</span>
                            <div class="card-panel-content">
                                <h5>Access to your All Diagnosis records and laboratary Records</h5>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordSummary;