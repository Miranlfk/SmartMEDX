import React from "react";


//to display panel of the Transaction Records
const TransactionSummary = ({patient}) =>{
    return(
        <>
            <div class="center">
                <div class="row" >
                    <div class="col s12 m7">
                        <div class="card-panel grey darken-4" style={{ borderRadius: "12px" }}>
                            <div class="card-panel-image">
                                <i class="large material-icons">
                                    history_toggle_off
                                </i>

                            </div>
                            <span class="card-title">TRANSACTION HISTORY</span>
                            <div class="card-content">
                                <h5>Access to your All Transactions and Claims on Our Service</h5>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default TransactionSummary;


