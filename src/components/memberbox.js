import {validate} from '@material-ui/pickers';
import React,{useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import "./warnmessages.css"

const components = {
  DropdownIndicator: null,
};


function CreatableInputOnly(props){
   const {value,inputValue} = props.formState
   const [mailerr,setmailerr] = useState("")
    const createOption = (label) => ({
      label,
      value: label,
    });
    function ValidateEmail(mail)
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    setmailerr("Member's email address is invalid!")
    return (false)
}

  const handleChange = (value) => {
    props.formHandler({...props.formState,value:value});
  };

  const handleInputChange = (inputValue) => {
    props.formHandler({...props.formState,inputValue:inputValue});
  };

  const handleKeyDown = (event) => {
    const { inputValue, value } = props.formState;
    if (!inputValue) return;
    if((event.key=="Enter"||event.key=="Tab")&&!ValidateEmail(inputValue)){
      console.log("hi")
        event.preventDefault();
        return;
    }
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        let arr;
        if(value==null){
          arr = [createOption(inputValue)]
        }
        else{
          arr = [...value,createOption(inputValue)]
        }
        props.formHandler({
          ...props.formState,
          inputValue: '',
          value: arr,
        });
        setmailerr("")
        event.preventDefault();
    }
    
  }
    return (
      <>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Members"
        value={value}
      />
      {mailerr!=""&&  <div class="alert alert-danger" role="alert">{mailerr}</div>}
      </>
    );
  }

  export default CreatableInputOnly;

