import { fetchData } from "./modules/fetchData.js";
import { formFactory } from "./modules/formFactory.js";
import { putData } from "./modules/putData.js";


const remoteURL = "https://easy-simple-users-rest-api.onrender.com/api/users";
// "data": [
//     {
//         "id": 1,
//         "name": "John Doe",
//         "email": "john@example.com",
//         "age": 44,
//         "gender": "male",
//         "avatar_url": "https://avatar.iran.liara.run/public/boy",
//         "created_at": "2025-10-27 13:05:52"
//     }, ...]
const localURL = "./mock-data/response.json";

// DOM elements
const alert = document.querySelector('.alert');
const spinner = document.querySelector('.spinner-grow');
const submitBtn = document.querySelector(".submit-btn");

const loadData = async () => {
	spinner.classList.remove("d-none");
	try {
		console.log("Fetching data...");
		const data = await fetchData(remoteURL);
		if (data) {
			spinner.classList.add("d-none");
			let users = data.data; // set the users variable
			displayUsers(users); // pass users to displayUsers
			editButtonListeners(users);
			
		}
	} catch (error) {
		console.error("Failed to load data:", error.message);
		spinner.classList.add("d-none");
		alert.classList.remove("d-none");
		alert.classList.add("alert-danger");
		alert.innerHTML = `Failed to load data: ${error.message}`;
	}
};
loadData();

const displayUsers = (localUsers) => {
	if (!localUsers || localUsers.length === 0){  // !users falsy or truthy
		alert.classList.remove("d-none");
		alert.classList.add("alert-danger");
		alert.innerHTML = "No users found.";
		return;
	}
	localUsers.forEach((user) => {
		const usersContainer = document.getElementById("users-container");
		usersContainer.innerHTML += `
		<article class="card">
			<div class="card-image p-3">
				<img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-contain">
				<span class="card-content">${user.name}</span>
			</div>

			<div class="card-content">
				<ul class="list-group">
					<li class="list-group-item"><strong>Name: </strong>${user.name}</li>
					<li class="list-group-item"><strong>Age: </strong>${user.age}</li>
					<li class="list-group-item"><strong>Gender: </strong>${user.gender}</li>
					<li class="list-group-item"><strong>Email: </strong>${user.email}</li>
				</ul>
				<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="btn btn-secondary m-2 edit-btn">Edit</button>
			</div>
		</article>
		`;
	});
};

const editButtonListeners = (users) => {
	// console.log("running event listener");
	const editButtons = document.querySelectorAll(".edit-btn");
	editButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			// console.log(editButtons);
			const modalBody = document.querySelector(".modal-body");
			modalBody.innerHTML = ""; // clear existing form
			modalBody.appendChild(formFactory());

			// Pre-fill user form values
			const formUser = users.find(  // return first element of users list that satisfies condition
				(user) => user.id === parseInt(e.target.getAttribute("data-user-id"))  // casts to int, and compares
			);
			getModalForm(formUser);
		})
	})
};
const getModalForm = async (formUser) => {
	const modalForm = document.querySelector(".modal-body").querySelector("form");

	modalForm.userName.value = formUser.name;
	modalForm.userAge.value = formUser.age;
	modalForm.userImage.value = formUser.avatar_url;
	modalForm.userGender.value = formUser.gender;

	handleSubmitBtn();
};
const handleSubmitBtn = () => {
	submitBtn.addEventListener("click", async () => {
		const dataToSend = {
			name: document.querySelector("#userName").value,
			age: document.querySelector("#userAge").value,
			avatar_url: document.querySelector("#userImage").value,
			gender: document.querySelector("#userGender").value,
			id: document.querySelector(".submit-btn").getAttribute("data-user-id")
		};
		// add spinner
		document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		`;
		// console.log(dataToSend)
		try{
			const putResponse = await putData(remoteURL, dataToSend);
			if (putResponse){
				document.querySelector(".modal-body") = `
			<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
				<div class="alert alert-success" role="alert">${putResponse.message}</div>
			</div>
			`;
			// dismiss modal
				const myModal = document.getElementById("exampleModal");
				const modal = bootstrap.Modal.getInstance(myModal);
				setTimeout(() => {
					modal.hide();
				}, 700)
			}
		} catch (error) {
			console.error("Failed to update data:", error);
			document.querySelector(".modal-body").innerHTML = `
			<div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
				<div class="alert alert-danger w-100" role="alert">
					${error.message}
				</div>
				<p class="mark">${error.stack}</p>
			</div>
			`;
		}
	});
};
// document.getElementById("launchBtn").onclick = () => {loadData();};


