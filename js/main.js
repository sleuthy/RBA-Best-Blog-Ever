"use strict";

let myTemplate = require('../templates/blogposts.hbs');

console.log("main.js loaded");

var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);
// dataRequest.addEventListener("abort", transferCanceled);

function dataRequestComplete(event) {
  var data = JSON.parse(event.target.responseText);
  createHTML(data);
  console.log("blog data from data request:", data);
}

function dataRequestFailed(event) {
  console.log("Oops, an error occurred while transferring the file.");
}
dataRequest.open("GET", "posts.json");
dataRequest.send();


function createHTML(blogData) {
	console.log("blog data within function", blogData);
	var blogContainer = document.getElementById("blog-container");
	blogContainer.innerHTML = myTemplate(blogData);
}