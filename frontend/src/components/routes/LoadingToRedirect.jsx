import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count , setCount] = useState(5);
    let history = useHistory();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        },1000)
        // redirect once count is equal to 0
        count === 0 && history.push('/'); 
        // clenup
        return () => clearInterval(interval)
    },[count])

    return (
        <div className='container p-5 text-center'>
            <p>Espere {count} segundos</p>
        </div>
    )
}

export default LoadingToRedirect;

