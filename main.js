// Get the current date
const currentDate = new Date();

// Format the current date
const formattedDate = currentDate.toLocaleDateString();

// Update multiple elements with the formatted date
document.querySelectorAll('[id^="date-"]').forEach((element) => {
  element.textContent = formattedDate;
});
//date script end--------------------------------------

    //verse code end.....

    // Prayer Request Form Handling (example)
    const prayerForm = document.getElementById('prayer-form');
    prayerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const name = document.getElementById('name').value;
        const fatherName = document.getElementById('father-name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const prayerRequest = document.getElementById('prayer-request').value;

        // Here, you would typically send this data to a server
        // For demonstration purposes, just log the data
        console.log({
            name,
            fatherName,
            mobile,
            email,
            address,
            prayerRequest
        });

        alert('Prayer request submitted! Dont Worry! '+ name+' God Always With You..& GOD BLESS YOU...');

        // Clear the form
        prayerForm.reset();
    });
});
