(function (app) {
  "use strict";
  const pageItems = {};

  app.todoStartup = function () {
    const frm = document.getElementById("choreForm");
    pageItems.choreList = document.getElementById("choreList");

    pageItems.proirity = frm.querySelector("#priority");
    pageItems.choreName = frm.querySelector("#choreName");
    pageItems.submit = frm.querySelector("#submit");
    pageItems.sort = frm.querySelector("#sort");
    pageItems.removeButton = frm.querySelector("#remove");

    pageItems.submit.addEventListener("click", addChore);
    pageItems.sort.addEventListener("click", sortPriorityLevels);
    pageItems.choreList.addEventListener("click", completeChore);
    pageItems.removeButton.addEventListener("click", removeChore);

    loadFromStorage();
  };

  function loadFromStorage() {
    const itemsString = localStorage.getItem("choreList");

    if (itemsString !== null) {
      const items = JSON.parse(itemsString);
      items.forEach((item) => {
        const li = document.createElement("li");

        li.innerText = item.chore;

        pageItems.choreList.appendChild(li);
      });
    }
  }

  function sortPriorityLevels(e) {
    e.preventDefault();

    const choreList = pageItems.choreList;
    const chores = Array.from(choreList.children);
    const priorityOrder = ["Low", "Medium", "High"];

    chores.sort((a, b) => {
      const labelA = a.innerText.split(": ")[0];
      const labelB = b.innerText.split(": ")[0];

      const priorityA = priorityOrder.indexOf(labelA);
      const priorityB = priorityOrder.indexOf(labelB);

      return priorityB - priorityA;
      //const textA = a.innerText.toLowerCase();
      //const textB = b.innerText.toLowerCase();
      //return textA.localeCompare(textB);
    });
    choreList.innerHTML = "";

    chores.forEach((chore) => {
      choreList.appendChild(chore);
    });
    saveToStorage();
  }

  function saveToStorage() {
    const items = Array.from(pageItems.choreList.children);
    const itemsToSave = items.map((item) => {
      return {
        chore: item.innerText,
        isComplete: item.classList.contains("completed-chore"),
      };
    });
    localStorage.setItem("choreList", JSON.stringify(itemsToSave));
  }

  function removeChore(e) {
    e.preventDefault();

    const items = Array.from(pageItems.choreList.children);

    items.forEach((el) => {
      if (el.classList.contains("completed-chore")) {
        pageItems.choreList.removeChild(el);
      }
    });
    saveToStorage();
  }
  function completeChore(e) {
    if (e.target.classList.contains("completed-chore")) {
      e.target.choreList.remove("completed-chore");
    } else {
      e.target.classList.add("completed-chore");
    }
    saveToStorage();
  }

  function addChore(e) {
    e.preventDefault();

    const chore = pageItems.choreName.value;
    const proir = pageItems.proirity.value;

    const priorityLabels = {
      1: "Low",
      2: "Medium",
      3: "High",
    };

    const choreItem = {
      chore: chore,
      priority: proir,
      priorityLabel: priorityLabels[proir],
    };

    const li = document.createElement("li");

    li.innerText = ` ${choreItem.priorityLabel}: ${choreItem.chore}`;
    pageItems.choreList.appendChild(li);
    pageItems.choreName.value = "";
    saveToStorage();
  }
})((window.app = window.app || {}));
