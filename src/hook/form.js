import { useContext, useState } from "react";
import { LoginContext } from "../components/contex/context.login";

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const contexType = useContext(LoginContext);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = async(event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  


 
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
