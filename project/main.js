
const fetchUserList = async () => {
    const data = await fetch ("https://jsonplaceholder.typicode.com/users");

    return data.json();
};

const contenDiv = document.querySelector(".content");
contentDiv.innerHTML =`
      <h1>Loading...</h1>
`;

const generateUserCard = (userInfo) => {
    return ` 
    <div style='boder: 1px solid red'>
    <p>name: ${userInfo.name}</p>
    <p>email: ${userInfo.email}</p>
    <p>username: ${userInfo.username}</p>
    <p>phone: ${userInfo.phone}</p>
    <button onclick='showDetail(${JSON.stringify(
        userInfo
    )})'>Show Detail</button>
    </div>
    `;
};

const showDetail = (user) => {
    const userInfoDiv = document.getElementById("userInfo");
    const userString = JSON>stringify(user);
    userInfoDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong>${user.email}</p>
    <p><strong>Username:</strong>${user.username}</p>
    <p><strong>Phone:</strong>${user.phone}</p>
    <button onclick='logUserInfo(${userString})'>Log user Info</button>
    `;
    document.getElementById("myModal").style.display = "block";

};
 const generateUserCardList = (userList) => {
    const content =`
    <div style=' display: flex; gap: 10px; flex-wrap:wrap'>
    ${userList.map((item) => generateUserCard(item)) }
  </div>
    `;
    return content;
 };
 //function to close the modal

 function closeModal(){
    document.getElementById("myModal").style.display="none";
 }

 //functionto log user Info
function logUserInfo(user) {
    console.log("User Info:", user);
    closeModal();
}

fetchUserList().then((data) => {
    contentDiv.innerHTML = generateUserCardList(data);

});
