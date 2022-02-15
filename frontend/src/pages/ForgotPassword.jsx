
import React , {useState} from "react";
import { auth } from '../firebase';
import {toast,ToastContainer} from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const ForgotPassword = ({history}) => {

    const [email,setEmail ] = useState('');
    const [loading, setLoading] = useState(false);

    //get state
    const {user} = useSelector((state) => ({...state}));

    /*
    redirect login where user login
    useEffect(() => {
        console.log(user)
        if ( user) {
            history.push('/')
        }
    },[user]);*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const actionCodeSettings = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
            handleCodeInApp : true
        }
        try {
            await sendPasswordResetEmail(auth,email,actionCodeSettings);
            setEmail('');
            setLoading(false);
            toast.success("Revisa tu bandeja de entrada");
        } catch (error) {
            setLoading(false);
            //toast.error(error.message);
            toast.error("Correo no encontrado");
        }
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }



    return ( 
        <div className="container col-md-6 offset-md-3 p-3">
            {loading ? (<h4 className="text-danger">Espere</h4>) 
                     : (<h4>Recuperar Contraseña</h4>)}
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" 
                       value = {email}
                       onChange={handleChangeEmail}
                       placeholder= "Tu correo"
                       autoFocus
                />
                <button className="btn btn-info mt-2"  type="submit" disabled={!email}>
                    Enviar
                </button>
            </form>
        </div>
    ); 
}

export default ForgotPassword;