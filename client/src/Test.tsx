import React from "react";

const Test = () => {
  const data = [
    { id: 1, name: "jay", profile_id: 1 },
    { id: 2, name: "jay", profile_id: 3 },
    { id: 3, name: "jay", profile_id: 4 },
    { id: 4, name: "jay", profile_id: 3 },
    { id: 5, name: "jay", profile_id: 5 },
  ];

  function logic() {
    var names = [
      "Mike",
      "Matt",
      "Nancy",
      "Adam",
      "Jenny",
      "Nancy",
      "Carl",
      "Nancy",
    ];

    var uniq = names
      .map((name) => {
        // console.log(name);
        return {
          count: 1,
          name: name,
        };
      })
      .reduce((a: any, b: any) => {
        // console.log(a, "a");
        // console.log(b, "b");
        a[b.name] = (a[b.name] || 0) + b.count;
        return a;
      }, {});

    var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
    // console.log(duplicates);
  }
  function logic2() {
    const profileIds = data.map((i) => i.profile_id);
    var uniq = profileIds
      .map((name) => {
        console.log(name);
        return {
          count: 1,
          name: name,
        };
      })
      .reduce((a: any, b: any) => {
        // console.log(a, "a");
        // console.log(b, "b");
        a[b.name] = (a[b.name] || 0) + b.count;
        return a;
      }, {});

    var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
  }
  return (
    <div>
      <h1>hello world</h1>
      {logic()}
      {logic2()}
    </div>
  );
};

export default Test;
