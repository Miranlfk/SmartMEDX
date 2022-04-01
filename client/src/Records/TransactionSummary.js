import React from "react";



const TransactionSummary = ({patient}) =>{
    return(
        <>
            <div class="center">
                <div class="row" style={{ paddingLeft: "550px" }}>
                    <div class="col s12 m8">
                        <div class="card deep-orange accent-2" style={{ borderRadius: "12px" }}>
                            <div class="card-image">
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


