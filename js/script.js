// function to fetch phone data and find the phone
const findPhone = () => {
  document.getElementById("card-container").textContent = "";
  const inputElement = document.getElementById("input-field");
  const inputValue = inputElement.value;
  inputElement.value = "";

  // handle error for empty input and number value
  const errorMsg = document.getElementById("error-msg");
  if (inputValue == "" || !isNaN(inputValue)) {
    errorMsg.innerHTML = `
    <marquee width="50%" direction="left" height="50px">
    Please input valid something....
    </marquee>
    `;
    inputElement.value = "";
    return (document.getElementById("card-container").innerHTML = "");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data));
    errorMsg.textContent = "";
  }
};

// function to get the fetched data and display them in UI
const displayPhone = (phones) => {
  //   console.log(phones);
  const topTwentyPhone = phones.slice(0, 20);
  const containerDiv = document.getElementById("card-container");
  topTwentyPhone.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 shadow rounded-3 p-3 border-0">
          <img src="${phone.image}" class="card-img-top img-fluid w-75 h-75 mx-auto" alt="..." />
            <div class="card-body">
                <h5 class="card-title text-center text-success">${phone.phone_name}</h5>
                <p class="card-text text-center">Brand: <span class="text-primary">${phone.brand}</span></p>
                <div class="text-center">
                     <button class="btn btn-outline-success" type="button" id="button-addon2">Details</button>
                </div>
            </div>
        </div>

    `;
    containerDiv.appendChild(div);
  });
};
