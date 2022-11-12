import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionAuthenticationSync, actionSignPhoneAsync } from "../redux/actions/userActions";

const CodeVerificaction = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [codigo, setCodigo] = useState("");
  const user = useSelector((store) => store.userStore);
  const validateCodigo = ({ target }) => {
    const code = target.value;
    setCodigo(code);
    if (code.length === 6) {
      dispatch(actionSignPhoneAsync(code));
      if(!user.name && !user.email ){
        navigate(`/createaccount/${user.uid}`)


      }
      else{
        navigate(`/home`)
      
      }
    }
  };
  return (
    <div>
      codeverifi
      <form>
        <label>
          Phone number
          <input
            type="number"
            onChange={validateCodigo}
            value={codigo}
            placeholder="Ingrese numero de telefono"
          />
        </label>
      </form>
    </div>
  );
};
export default CodeVerificaction;
