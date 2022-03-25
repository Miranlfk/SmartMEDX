
import './Trans.css';
import Trans from './Trans';

const Transaction = () =>{
    return (
        <div className="App">
          <div className="page-deets">
            <h2>Patient Transaction Details</h2> {/* Instead of 'Patient' Patient Name shud be displayed */}
          </div>
    
          {/* Iterate over imported array in userData */}
          <div className="users">
            {Trans.map((user, index) => {
              return(
                <div key={index}> 
                  <p>Surgery: {user.Surgery}</p>
                  <p>Date: {user.Date}</p>
                  <p>Surgery Cost: {user.Surgery_Cost}</p>
                  <p>Claim: {user.Claimed_Value}</p>
                  <p>Available Funds: {user.Available_Funds}</p>
                </div>
              )
            })}
            {/* Display each data in array in a card */}
            {/* Each card must have a 'key' attribute */}
          </div>
        </div>
      );
}

export default Transaction;