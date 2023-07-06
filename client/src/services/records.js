function convertToJSON(param) {
  let obj = {};
  param.forEach((value, key) => (obj[key] = value));
  return JSON.stringify(obj);
}

export async function postContactInfo(params) {
  //console.log(JSON.stringify(params), params);
  await fetch("http://localhost:5000/records/add", {
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

export async function fetchAllContactData() {
  let _allData = null;
  await fetch("http://localhost:5000/records", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (value) => (_allData = value),
      (err) => console.log("Error during GET call", err)
    );
  /* console.log("Hi there", _allData); */
  return { data: _allData };
}

export async function fetchContact(param) {
  let _data = null;
  const res = await fetch(`http://localhost:5000/records/${param.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  _data = await res.json();
  return { contact: _data };
}

export async function updateContact(formData, param) {
  try {
    const res = await fetch(
      `http://localhost:5000/records/update/${param.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertToJSON(formData),
      }
    );
    const val = await res.json();
  } catch (err) {
    console.log("Error while updating data");
  }
}
