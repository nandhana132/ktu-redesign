/* ========================================
   KTU CONNECT - JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       EXAMINATION SEARCH AND FILTER
    ======================================== */

    const examSearch = document.getElementById("examSearch");
    const semesterFilter = document.getElementById("semesterFilter");
    const examCards = document.querySelectorAll(".exam-card");
    const noExams = document.getElementById("noExams");

    function filterExams() {
        if (!examSearch || !semesterFilter) {
            return;
        }

        const searchText = examSearch.value.toLowerCase().trim();
        const selectedSemester = semesterFilter.value;

        let visibleCount = 0;

        examCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardSemester = card.dataset.semester;

            const matchesSearch = cardText.includes(searchText);

            const matchesSemester =
                selectedSemester === "all" ||
                selectedSemester === "" ||
                cardSemester === selectedSemester;

            if (matchesSearch && matchesSemester) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noExams) {
            noExams.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }

    if (examSearch) {
        examSearch.addEventListener("input", filterExams);
    }

    if (semesterFilter) {
        semesterFilter.addEventListener("change", filterExams);
    }


    /* ========================================
       EXAMINATION BUTTON MESSAGE
    ======================================== */

    window.showExamMessage = function (itemName) {
        alert(
            itemName +
            "\n\nThis is a demonstration website. " +
            "Please visit the official KTU website " +
            "for verified examination information."
        );
    };


    /* ========================================
       SAMPLE RESULTS FOR DIFFERENT SEMESTERS
    ======================================== */

    const resultSemester = document.getElementById("resultSemester");
    const resultTableBody = document.getElementById("resultTableBody");
    const sgpaValue = document.getElementById("sgpaValue");

    const semesterResults = {

        "2": {
            sgpa: "8.10",
            subjects: [
                ["MAT102", "Mathematics II", "4", "A", "Passed"],
                ["EST102", "Programming in C", "4", "B+", "Passed"],
                ["EST104", "Engineering Graphics", "3", "A", "Passed"],
                ["HUN102", "Life Skills", "2", "B", "Passed"]
            ]
        },

        "4": {
            sgpa: "8.25",
            subjects: [
                ["EST200", "Design and Engineering", "3", "A", "Passed"],
                ["MAT202", "Probability and Statistics", "4", "B+", "Passed"],
                ["EST202", "Digital Electronics", "4", "A", "Passed"],
                ["HUT200", "Professional Ethics", "2", "B", "Passed"]
            ]
        },

        "6": {
            sgpa: "8.40",
            subjects: [
                ["CST302", "Computer Networks", "4", "A", "Passed"],
                ["CST304", "Database Management", "4", "A+", "Passed"],
                ["CST306", "Operating Systems", "4", "B+", "Passed"],
                ["CST308", "Software Engineering", "3", "A", "Passed"]
            ]
        },

        "8": {
            sgpa: "8.65",
            subjects: [
                ["CST402", "Project Work", "8", "A+", "Passed"],
                ["CST404", "Seminar", "2", "A", "Passed"],
                ["CST406", "Comprehensive Course", "2", "A", "Passed"]
            ]
        }

    };


    function displayResults(semester) {

        if (!resultTableBody || !sgpaValue) {
            return;
        }

        const result = semesterResults[semester];

        if (!result) {
            return;
        }

        resultTableBody.innerHTML = "";

        result.subjects.forEach(function (subject) {

            const row = document.createElement("tr");

            subject.forEach(function (value, index) {

                const cell = document.createElement("td");

                if (index === 3) {
                    const grade = document.createElement("span");
                    grade.className = "grade";
                    grade.textContent = value;
                    cell.appendChild(grade);

                } else if (index === 4) {
                    const status = document.createElement("span");
                    status.className = "status-pass";
                    status.textContent = value;
                    cell.appendChild(status);

                } else {
                    cell.textContent = value;
                }

                row.appendChild(cell);

            });

            resultTableBody.appendChild(row);

        });

        sgpaValue.innerHTML =
            result.sgpa + " <span>/ 10</span>";
    }


    if (resultSemester) {

        resultSemester.addEventListener("change", function () {
            displayResults(resultSemester.value);
        });

        // Display the selected semester's sample results.
        displayResults(resultSemester.value);
    }

});