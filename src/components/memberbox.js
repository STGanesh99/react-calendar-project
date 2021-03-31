import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

function CreatableInputOnly(props) {
  const optionList = props.memberState.map((member) => ({
    label: member,
    value: member,
    email:member,
  }));
  const [state, stateHandler] = useState({
    inputValue: "",
    value: optionList,
  });
  const [mailErr, setMailErr] = useState("");

  const createOption = (label) => ({
    label,
    value: label,
    email:label
  });

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    setMailErr("Member's email address is invalid!");
    return false;
  }

  const handleChange = async (value) => {
    console.log(value)
    stateHandler({ ...state, value: value });
    let values = value.map((item) => item.label);
    console.log(values)
    props.memberListHandler([...values])
  };

  const handleInputChange = (inputValue) => {
    console.log(inputValue)
    stateHandler({ ...state, inputValue: inputValue });
  };

  const handleKeyDown = (event) => {
    if (!state.inputValue) return;
    if (
      (event.key === "Enter" || event.key === "Tab" || event.key === "Space") &&
      !ValidateEmail(state.inputValue)
    ) {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case "Enter" || "Tab" || "Space":
        setMailErr("");
        stateHandler({
          inputValue: "",
          value: [...state.value, createOption(state.inputValue)],
        });
        let oldValues = state.value.map((item) =>  { return{email:item.label}});
        props.memberListHandler([...oldValues,{email:state.inputValue}]);
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <CreatableSelect
        isMulti
        inputValue={state.inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Members"
        value={state.value}
        options = {props.sugmem}
      />
      {mailErr !== "" && (
        <div className="alert alert-danger" role="alert">
          {mailErr}
        </div>
      )}
    </>
  );
}

export default CreatableInputOnly;
