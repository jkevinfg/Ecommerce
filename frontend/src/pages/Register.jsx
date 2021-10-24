import React,{useState} from 'react';

const Register = () => {


const [email,setEmail] = useState('');


const handleSubmit = (event) => {
  event.preventDefault();
  console.log(email);

}
const handleChange=(event) => {
  setEmail(event.target.value);
}

return (
  <div className="container p-3">
      <div className="row">
            <div className="col-md-6 offset-md-3">
                  <h4>Registro</h4>
                  <form onSubmit={handleSubmit}>
                      <input type="email" className="form-control" onChange={handleChange}/>
                      <button type="submit" className="btn btn-success mt-2">Enviar</button>
                  </form>
            </div>
         </div>
  </div>


  )

}

export default Register;
