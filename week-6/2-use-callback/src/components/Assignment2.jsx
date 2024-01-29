import React, { useState, useCallback, memo, useRef } from "react";

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

// let timeoutId = 0;
export function Assignment2() {
  const [inputText, setInputText] = useState("");
  const [flag, setFlag] = useState(true);
  const timeoutRef = useRef(0)

  // Your code starts here
  const showAlert = useCallback(() => {
    alert(inputText);
  }, [flag]);

  function set() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log("asdasd");
      setFlag(!flag ? true : false);
    }, 300);
  }
  // Your code ends here

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          set();
        }}
        placeholder="Enter some text"
      />
      <Alert showAlert={showAlert} />
    </div>
  );
}

const Alert = memo(function Alert({ showAlert }) {
  console.log("ALERRRT IN FUNCITON");
  return <button onClick={showAlert}>Show Alert</button>;
});
