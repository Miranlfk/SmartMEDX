import React from 'react';
import './ImagePatient.css';
import InsuranceCover from '../../images/InsuranceCover.png';
import Form from 'react-bootstrap/Form'

function ImagePatient() {
  return (
    <div>
        <div class="card">
                <img src= {InsuranceCover}/>
            <div class="container">
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
            </div>
        </div>
    
      <div>
                <Form >
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="validatedCustomFile" required/>
                        <label class="custom-file-label" for="validatedCustomFile">Upload Your Image Here</label>
                        <div class="invalid-feedback">Example invalid custom file feedback</div>
                    </div> 
                            
                    <div class="col-12">
                            <button className='buttonsubmit'    type="submit">Upload</button>
                    </div> 

                    
                    
                </Form>
        </div>

    </div>
  )
}

export default ImagePatient;