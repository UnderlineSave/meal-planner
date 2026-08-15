//The master list of all foods I've defined. Lives here so it persists between clicks.
const foods =[];

// Grab the form element from the page using its id
const form = document.getElementById("add-food-form");

// Run this function whenever the form is submited
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read the three values from the input boxes
    const name = document.getElementById("food-name").value;
    const calories = Number(document.getElementById("food-calories").value);
    const protein = Number(document.getElementById("food-protein").value);

    //Bundle the three values into one food object
    const food = { name: name, calories: calories, protein: protein };

    //Add that object to the master list
    foods.push(food);

    console.log(foods);
    form.reset();
});