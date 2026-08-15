//The master list of all foods I've defined. Lives here so it persists between clicks.
const foods =[];

// Grab the form element from the page using its id
const form = document.getElementById("add-food-form");


// Draw the foods array onto the page. Called whenever foods changes
function renderFoods() {
    const list = document.getElementById("food-list");

    // 1. Clear whatever is currently shown
    list.innerHTML = "";
    
    // 2. Build one <li> for each food and add it to the list
    for (const food of foods) {
        const li = document.createElement("li");
        li.textContent = food.name + " — " + food.calories + " kcal, " + food.protein + "g protein";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = food.id;

        li.appendChild(removeBtn);
        list.appendChild(li);
    }
};


// Run this function whenever the form is submited
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read the three values from the input boxes
    const name = document.getElementById("food-name").value;
    const calories = Number(document.getElementById("food-calories").value);
    const protein = Number(document.getElementById("food-protein").value);

    //Bundle the three values into one food object
    const food = { id: Date.now(), name: name, calories: calories, protein: protein };

    //Add that object to the master list
    foods.push(food);

    console.log(foods);
    form.reset();

    renderFoods();
});

const foodList = document.getElementById("food-list");

foodList.addEventListener("click", function (event) {
    // Only react if a Remove button was clicked
    if (event.target.tagName === "BUTTON") {
        const id = Number(event.target.dataset.id);

        //Rebuild the array without the food that has this id
        const index = foods.findIndex(function (food) {
            return food.id === id;
        });
        foods.splice(index, 1);

        renderFoods();
    }
});