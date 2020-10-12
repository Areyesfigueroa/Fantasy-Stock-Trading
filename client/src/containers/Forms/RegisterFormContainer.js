import React, { useReducer, useState } from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';

const RegisterFormContainer = (props) => {
    const initialState = {
        email: null,
        fName: null,
        lName: null,
        password: null,
        retypePassword: null,
        termsCheck: false
    };

    const reducer = (state, action) => {
        switch(action.type) {
            case 'email':
                return { email: state.email }
            case 'fName':
                return { fName: state.fName }
            case 'lName':
                return { lName: state.lName }
            case 'password':
                return { password: state.password }
            case 'retypePassword':
                return { retypePassword: state.retypePassword }
            case 'termsCheck':
                return { termsCheck: state.termsCheck }
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // const [email, setEmail] = useState(null);
    // const [fName, setFName] = useState(null);
    // const [lName, setLName] = useState(null);
    // const [password, setPassword] = useState(null);
    // const [retypePassword, setRetypePassword] = useState(null);
    // const [termsCheck, setTermsCheck] = useState(null);

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + state.email);
        event.preventDefault();

        // registerUser()
        // .then(res => {
        //     alert(res);
        // })
        // .catch(error => {
        //     alert(error);
        // })
    }
    return (
        <RegisterForm 
            style={props.style}
            disableLabels={props.disableLabels }
            disableFormText={props.disableFormText}
            btnText={props.btnText}
            submit={handleSubmit}
            // change={(type) => dispatch({ type })} 
            />
    );
};

export default RegisterFormContainer;