function showMessage() {
    alert(
        "This is a website redesign prototype. " +
        "Student login is not connected to the official KTU portal."
    );
}

function searchWebsite() {
    const input = document.getElementById("searchInput");
    const message = document.getElementById("searchMessage");

    const query = input.value.trim().toLowerCase();

    if (query === "") {
        message.textContent = "Please enter what you want to find.";
        input.focus();
        return;
    }

    if (
        query.includes("exam") ||
        query.includes("timetable") ||
        query.includes("semester")
    ) {
        window.location.href = "examination.html";
    } else if (
        query.includes("result") ||
        query.includes("mark") ||
        query.includes("grade") ||
        query.includes("sgpa") ||
        query.includes("cgpa")
    ) {
        window.location.href = "results.html";
    } else if (
        query.includes("notification") ||
        query.includes("announcement")
    ) {
        document.getElementById("announcements").scrollIntoView({
            behavior: "smooth"
        });

        message.textContent = "Showing the announcements section.";
    } else {
        message.textContent =
            "Try searching for exams, timetable, results or notifications.";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchWebsite();
        }
    });
});