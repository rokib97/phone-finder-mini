const errorMsg = document.getElementById("error-msg");
// function to generate a error messeage
const handleError = (value) => {
  if (value) {
    errorMsg.innerHTML = `
      <marquee behavior="scroll" scrollamount="12" width="75%" direction="left" height="50px">
      Please input a valid name....
      </marquee>
      `;
  } else {
    errorMsg.innerHTML = `
      <marquee behavior="scroll" scrollamount="12" width="75%" direction="left" height="50px">
      Search phone not found....
      </marquee>
      `;
  }
};

// function to toggle spinner
const spinnerToggle = (value) => {
  document.getElementById("spinner").style.display = value;
};

// function to fetch phone data and find the phones
const findPhone = () => {
  spinnerToggle("block");
  document.getElementById("card-container").textContent = "";
  document.getElementById("phone-details").textContent = "";
  const inputElement = document.getElementById("input-field");
  const inputValue = inputElement.value.toLowerCase();
  inputElement.value = "";

  // handle error for empty input and number value
  if (inputValue == "" || !isNaN(inputValue)) {
    handleError(true);
    spinnerToggle("none");
    document.getElementById("image").style.display = "block";
    inputElement.value = "";
    document.getElementById("search-result").innerHTML = "";
    document.getElementById("phone-details").innerHTML = "";
    return (document.getElementById("card-container").innerHTML = "");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // handle error for not found phone data
        if (data.data.length === 0) {
          handleError(false);
          spinnerToggle("none");
          document.getElementById("image").style.display = "block";
          document.getElementById("search-result").innerHTML = "";
          document.getElementById("phone-details").innerHTML = "";
        } else {
          displayPhone(data.data);
        }
      });
  }
};

// function to get the fetched data and display them in UI
const displayPhone = (phones) => {
  // console.log(phones.length);
  const topTwentyPhone = phones.slice(0, 20);
  const containerDiv = document.getElementById("card-container");
  topTwentyPhone.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div id="card-single" class="card h-100 shadow-lg rounded-3 p-3 border-0">
          <img src="${phone.image}" class="card-img-top img-fluid w-75 h-75 mx-auto" alt="..." />
            <div class="card-body">
                <h5 class="card-title text-center text-success">${phone.phone_name}</h5>
                <p class="card-text text-center">Brand: <span class="text-primary">${phone.brand}</span></p>
                <div class="text-center">
                     <button onclick="loadDetail('${phone.slug}')" class="btn btn-outline-success" type="button" id="button-addon2">Details</button>
                </div>
            </div>
        </div>

    `;
    containerDiv.appendChild(div);

    // spinner and showing error msg disabled
    spinnerToggle("none");
    errorMsg.textContent = "";
    document.getElementById("image").style.display = "none";

    // showing search result separately
    document.getElementById("search-result").innerHTML = `
    <h5 class="card-title text-center fw-bolder text-white">Search results for <span class="text-warning">"${phone.brand}"</span></h5>
    <h5 class="card-title text-center fw-bolder text-white">Total items found : <span class="text-warning">${phones.length}</span></h5>
    `;
  });
};

// function to fetch single phone and get the date
const loadDetail = (infoId) => {
  // console.log(infoId);
  const url = `https://openapi.programming-hero.com/api/phone/${infoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetail(data.data));
};

// function to display single phone details
const displayDetail = (phone) => {
  console.log(phone);
  const detailContainerDiv = document.getElementById("phone-details");
  detailContainerDiv.innerHTML = `
        <div class="card rounded-3 p-3 border-0 shadow-lg">
            <img src="${
              phone.image
            }" class="card-img-top w-25 mx-auto img-fluid" alt="...">
            <div class="card-body">
                  <h5 class="card-title text-success">${phone.name}</h5>
                  <p class="card-text">Brand: <span class="text-primary">${
                    phone.brand
                  }</span></p>
                  <p class="card-text">Release Date: <span class="text-primary">${
                    phone.releaseDate
                      ? phone.releaseDate
                      : "No Release Date Found"
                  }</span></p>
                  <p class="card-text card-title fw-bold text-success">MAIN FEATURES:</span></p>
                  <ul class="">
                    <li class=""><span class="text-danger">Chipset</span>: ${
                      phone.mainFeatures.chipSet
                    }</li>
                    <li class=""><span class="text-danger">Display Size</span>: ${
                      phone.mainFeatures.displaySize
                    }</li>
                    <li class=""><span class="text-danger">Memory</span>: ${
                      phone.mainFeatures.memory
                    }</li>
                    <li class=""><span class="text-danger">Storage</span>: ${
                      phone.mainFeatures.storage
                    }</li>
                 </ul>
                  <p class="card-text text-success fw-bold">SENSORS:</span></p>
                  <ul class="">
                    <li class="">${
                      phone.mainFeatures.sensors[0]
                        ? phone.mainFeatures.sensors[0]
                        : "Not Found"
                    }</li>
                    <li class="">${
                      phone.mainFeatures.sensors[1]
                        ? phone.mainFeatures.sensors[1]
                        : "Not Found"
                    }</li>
                    <li class="">${
                      phone.mainFeatures.sensors[2]
                        ? phone.mainFeatures.sensors[2]
                        : "Not Found"
                    }</li>
                    <li class="">${
                      phone.mainFeatures.sensors[3]
                        ? phone.mainFeatures.sensors[3]
                        : "Not Found"
                    }</li>
                    <li class="">${
                      phone.mainFeatures.sensors[4]
                        ? phone.mainFeatures.sensors[4]
                        : "Not Found"
                    }</li>
                    <li class="">${
                      phone.mainFeatures.sensors[5]
                        ? phone.mainFeatures.sensors[5]
                        : "Not Found"
                    }</li>
                 </ul>
                 <p class="card-text text-success fw-bold">OTHERS:</span></p>
                  <ul class="">
                    <li class=""><span class="text-danger">Bluetooth</span>: ${
                      phone?.others?.Bluetooth
                        ? phone?.others?.Bluetooth
                        : "Not Found"
                    }</li>
                    <li class=""><span class="text-danger">GPS</span>: ${
                      phone?.others?.GPS ? phone?.others?.GPS : "Not Found"
                    }</li>
                    <li class=""><span class="text-danger">NFC</span>: ${
                      phone?.others?.NFC ? phone?.others?.NFC : "Not Found"
                    }</li>
                    <li class=""><span class="text-danger">Radio</span>: ${
                      phone?.others?.Radio ? phone?.others?.Radio : "Not Found"
                    }</li>
                    <li class=""><span class="text-danger">USB</span>: ${
                      phone?.others?.USB ? phone?.others?.USB : "Not Found"
                    }</li>
                    <li class=""><span class="text-danger">Wlan</span>: ${
                      phone?.others?.WLAN ? phone?.others?.WLAN : "Not Found"
                    }</li>
                 </ul>
            </div>
      </div>
  `;
};
