import { useState } from "react";

export default function FreakingComponent() {
  const arr = new Array(10).fill("maserrati");
  const [toggle, setToggle] = useState<boolean[]>(
    new Array(arr.length).fill(false)
  );

  function toggleMe(i: number) {
    const tempToggle = [...toggle];
    tempToggle[i] = !tempToggle[i];
    setToggle(tempToggle);
  }

  return (
    <>
      <h1>Hello wahts'up</h1>
      <div>
        {arr.map((item, index) => (
          <>
            <h5>{item}</h5>
            <button onClick={() => toggleMe(index)}>
              click me to show a button
            </button>
            {toggle[index] && <p>This is the hidden text</p>}
          </>
        ))}
      </div>
    </>
  );
}
