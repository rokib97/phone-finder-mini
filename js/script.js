// function to fetch phone data and find the phone
const findPhone = () => {
  document.getElementById("card-container").textContent = "";
  document.getElementById("phone-details").textContent = "";
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
    document.getElementById("search-result").innerHTML = "";
    document.getElementById("phone-details").innerHTML = "";
    return (document.getElementById("card-container").innerHTML = "");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // handle error for not found phone data
        if (data.data.length == 0) {
          errorMsg.innerHTML = `
          <marquee width="50%" direction="left" height="50px">
          Please input valid something....
          </marquee>
          `;
          document.getElementById("search-result").innerHTML = "";
          document.getElementById("phone-details").innerHTML = "";
        } else {
          displayPhone(data.data);
          errorMsg.textContent = "";
        }
      });
  }
};

// function to get the fetched data and display them in UI
const displayPhone = (phones) => {
  console.log(phones);
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
                     <button onclick="loadDetail('${phone.slug}')" class="btn btn-outline-success" type="button" id="button-addon2">Details</button>
                </div>
            </div>
        </div>

    `;
    containerDiv.appendChild(div);
    // showing search result brand name
    document.getElementById("search-result").innerHTML = `
    <h5 class="card-title text-center fw-bolder">Search results for <span class="text-success">"${phone.brand}"</span></h5>
    <h5 class="card-title text-center fw-bolder">Total items found : <span class="text-success">${phones.length}</span></h5>
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
        <div class="card">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
            <div class="card-body">
                  <h5 class="card-title text-success">${phone.name}</h5>
                  <p class="card-text">Brand: <span class="text-primary">${phone.brand}</span></p>
                  <p class="card-text">Release Date: <span class="text-primary">${phone.releaseDate}</span></p>
                  <p class="card-text text-success">MAIN FEATURES:</span></p>
                  <ul class="">
                    <li class=""><span class="text-danger">Chipset</span>: ${phone.mainFeatures.chipSet}</li>
                    <li class=""><span class="text-danger">Display Size</span>: ${phone.mainFeatures.displaySize}</li>
                    <li class=""><span class="text-danger">Memory</span>: ${phone.mainFeatures.memory}</li>
                    <li class=""><span class="text-danger">Storage</span>: ${phone.mainFeatures.storage}</li>
                 </ul>
                  <p class="card-text text-success">SENSORS:</span></p>
                  <ul class="">
                    <li class="">${phone.mainFeatures.sensors[0]}</li>
                    <li class="">${phone.mainFeatures.sensors[1]}</li>
                    <li class="">${phone.mainFeatures.sensors[2]}</li>
                    <li class="">${phone.mainFeatures.sensors[3]}</li>
                    <li class="">${phone.mainFeatures.sensors[4]}</li>
                    <li class="">${phone.mainFeatures.sensors[5]}</li>
                 </ul>
                 <p class="card-text text-success">OTHERS:</span></p>
                  <ul class="">
                    <li class=""><span class="text-danger">Bluetooth</span>: ${phone.others.Bluetooth}</li>
                    <li class=""><span class="text-danger">GPS</span>: ${phone.others.GPS}</li>
                    <li class=""><span class="text-danger">NFC</span>: ${phone.others.NFC}</li>
                    <li class=""><span class="text-danger">Radio</span>: ${phone.others.Radio}</li>
                    <li class=""><span class="text-danger">USB</span>: ${phone.others.USB}</li>
                    <li class=""><span class="text-danger">Wlan</span>: ${phone.others.WLAN}</li>
                 </ul>
            </div>
      </div>
  `;
};
