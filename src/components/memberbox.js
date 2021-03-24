import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

function CreatableInputOnly(props) {
  const optionList = props.memberState.map((member) => ({
    label: member,
    value: member,
  }));
  const [state, stateHandler] = useState({
    inputValue: "",
    value: optionList,
  });
  const [mailErr, setMailErr] = useState("");

  const createOption = (label) => ({
    label,
    value: label,
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

  const handleChange = (value) => {
    stateHandler({ ...state, value: value });
    let values = value.map((item) => item.label);
    props.memberListHandler([...values]);
  };

  const handleInputChange = (inputValue) => {
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
        let oldValues = state.value.map((item) => item.label);
        props.memberListHandler([...oldValues, state.inputValue]);
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <CreatableSelect
        components={components}
        inputValue={state.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Members"
        value={state.value}
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
