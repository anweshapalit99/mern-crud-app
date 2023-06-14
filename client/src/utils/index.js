function convertToJSON(param) {
  let obj = {};
  param.forEach((value, key) => (obj[key] = value));
  return JSON.stringify(obj);
}

export async function postContactInfo(params) {
  //console.log(JSON.stringify(params), params);
  await fetch("http://localhost:5000/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: convertToJSON(params),
  })
    .then((res) => res.json())
    .then(
      (value) => console.log(value),
      (err) => console.log("Error during POST call", err)
    );
}

export async function fetchContactData() {
  await fetch("http://localhost:5000/records", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (value) => console.log(value),
      (err) => console.log("Error during GET call", err)
    );
}
