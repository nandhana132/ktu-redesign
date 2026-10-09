/* ==========================================
   KTU WEBSITE REDESIGN
   Shared JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       HOME PAGE SEARCH
    ====================================== */

    const portalSearchForm = document.getElementById("portalSearchForm");
    const portalSearch = document.getElementById("portalSearch");
    const portalSearchMessage = document.getElementById("portalSearchMessage");

    if (portalSearchForm && portalSearch) {

        portalSearchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = portalSearch.value.trim().toLowerCase();

            if (!query) {
                portalSearchMessage.textContent =
                    "Please enter something to search.";
                return;
            }

            if (
                query.includes("exam") ||
                query.includes("schedule") ||
                query.includes("semester")
            ) {
                window.location.href = "examination.html";
                return;
            }

            if (
                query.includes("result") ||
                query.includes("mark") ||
                query.includes("grade") ||
                query.includes("sgpa") ||
                query.includes("cgpa")
            ) {
                window.location.href = "results.html";
                return;
            }

            if (
                query.includes("notification") ||
                query.includes("update") ||
                query.includes("announcement")
            ) {
                window.location.href = "index.html#notifications";
                return;
            }

            portalSearchMessage.textContent =
                "No matching section found. Try searching for examinations, results or notifications.";
        });
    }


    /* ======================================
       EXAMINATION SEARCH AND FILTERS
    ====================================== */

    const examSearch = document.getElementById("examSearch");
    const semesterFilter = document.getElementById("semesterFilter");
    const examTypeFilter = document.getElementById("examTypeFilter");
    const clearExamFilters = document.getElementById("clearExamFilters");

    const examItems = document.querySelectorAll(".exam-item");
    const noExams = document.getElementById("noExams");
    const examCount = document.getElementById("examCount");

    function filterExams() {

        if (!examSearch || !semesterFilter || !examTypeFilter) {
            return;
        }

        const query = examSearch.value.trim().toLowerCase();
        const semester = semesterFilter.value;
        const type = examTypeFilter.value;

        let visibleCount = 0;

        examItems.forEach(function (item) {

            const text = item.textContent.toLowerCase();
            const itemSemester = item.dataset.semester;
            const itemType = item.dataset.type;

            const matchesSearch = text.includes(query);

            const matchesSemester =
                semester === "all" || itemSemester === semester;

            const matchesType =
                type === "all" || itemType === type;

            const visible =
                matchesSearch && matchesSemester && matchesType;

            item.hidden = !visible;

            if (visible) {
                visibleCount++;
            }
        });

        if (noExams) {
            noExams.hidden = visibleCount !== 0;
        }

        if (examCount) {
            examCount.textContent =
                "Showing " + visibleCount + " examination(s)";
        }
    }

    if (examSearch) {
        examSearch.addEventListener("input", filterExams);
    }

    if (semesterFilter) {
        semesterFilter.addEventListener("change", filterExams);
    }

    if (examTypeFilter) {
        examTypeFilter.addEventListener("change", filterExams);
    }

    if (clearExamFilters) {
        clearExamFilters.addEventListener("click", function () {

            examSearch.value = "";
            semesterFilter.value = "all";
            examTypeFilter.value = "all";

            filterExams();
        });
    }

    if (examItems.length > 0) {
        filterExams();
    }


    /* ======================================
       EXAMINATION DETAILS DIALOG
    ====================================== */

    const examDialog = document.getElementById("examDialog");
    const dialogExamTitle = document.getElementById("dialogExamTitle");
    const dialogExamDate = document.getElementById("dialogExamDate");

    const closeExamDialog = document.getElementById("closeExamDialog");
    const dialogOkay = document.getElementById("dialogOkay");

    const examDetailButtons = document.querySelectorAll("[data-exam-details]");

    examDetailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const examName = button.dataset.examDetails;
            const examDate = button.dataset.examDate;

            if (examDialog && dialogExamTitle && dialogExamDate) {

                dialogExamTitle.textContent = examName;
                dialogExamDate.textContent =
                    "Sample examination dates: " + examDate;

                examDialog.showModal();
            }
        });
    });

    function closeDialog() {
        if (examDialog && examDialog.open) {
            examDialog.close();
        }
    }

    if (closeExamDialog) {
        closeExamDialog.addEventListener("click", closeDialog);
    }

    if (dialogOkay) {
        dialogOkay.addEventListener("click", closeDialog);
    }


    /* ======================================
       SAMPLE SEMESTER RESULTS
    ====================================== */

    const resultSemester = document.getElementById("resultSemester");
    const resultTableBody = document.getElementById("resultTableBody");

    const sgpaValue = document.getElementById("sgpaValue");
    const cgpaValue = document.getElementById("cgpaValue");
    const creditValue = document.getElementById("creditValue");
    const resultStatus = document.getElementById("resultStatus");

    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");
    const progressBar = document.getElementById("progressBar");
    const progressDescription =
        document.getElementById("progressDescription");

    const semesterResults = {

        "2": {
            sgpa: "8.1",
            cgpa: "8.1",
            credits: 22,
            status: "Pass",
            cleared: 5,
            total: 6,
            subjects: [
                ["MAT102", "Mathematics II", 85, "A", "Pass"],
                ["EST102", "Programming in C", 78, "B+", "Pass"],
                ["EST104", "Engineering Graphics", 82, "A", "Pass"],
                ["HUN102", "Life Skills", 74, "B", "Pass"],
                ["PHT100", "Physics", 80, "A", "Pass"],
                ["CYT100", "Chemistry", 69, "B", "Pass"]
            ]
        },

        "4": {
            sgpa: "7.8",
            cgpa: "7.5",
            credits: 24,
            status: "Pass",
            cleared: 4,
            total: 6,
            subjects: [
                ["CS201", "Mathematics", 85, "A", "Pass"],
                ["CS202", "Physics", 78, "B+", "Pass"],
                ["CS203", "Chemistry", 72, "B", "Pass"],
                ["CS204", "English", 68, "B", "Pass"],
                ["CS205", "Digital Electronics", 88, "A", "Pass"],
                ["CS206", "Programming", 76, "B+", "Pass"]
            ]
        },

        "6": {
            sgpa: "8.4",
            cgpa: "7.9",
            credits: 23,
            status: "Pass",
            cleared: 5,
            total: 6,
            subjects: [
                ["CST302", "Computer Networks", 86, "A", "Pass"],
                ["CST304", "Database Management", 92, "A+", "Pass"],
                ["CST306", "Operating Systems", 78, "B+", "Pass"],
                ["CST308", "Software Engineering", 84, "A", "Pass"],
                ["CST310", "System Design", 81, "A", "Pass"],
                ["CST312", "Computer Graphics", 75, "B+", "Pass"]
            ]
        },

        "8": {
            sgpa: "8.7",
            cgpa: "8.0",
            credits: 12,
            status: "Pass",
            cleared: 3,
            total: 3,
            subjects: [
                ["CST402", "Project Work", 92, "A+", "Pass"],
                ["CST404", "Seminar", 86, "A", "Pass"],
                ["CST406", "Comprehensive Course", 88, "A", "Pass"]
            ]
        }

    };


    function displayResults(semester) {

        if (!resultTableBody || !semesterResults[semester]) {
            return;
        }

        const result = semesterResults[semester];

        resultTableBody.replaceChildren();

        result.subjects.forEach(function (subject) {

            const row = document.createElement("tr");

            subject.forEach(function (value, index) {

                const cell = document.createElement("td");

                if (index === 3) {

                    const grade = document.createElement("span");
                    grade.className = "grade-pill";
                    grade.textContent = value;
                    cell.appendChild(grade);

                } else if (index === 4) {

                    const status = document.createElement("span");
                    status.className =
                        value === "Pass" ? "pass-label" : "fail-label";

                    status.textContent = value;
                    cell.appendChild(status);

                } else {

                    cell.textContent = value;
                }

                row.appendChild(cell);
            });

            resultTableBody.appendChild(row);
        });

        if (sgpaValue) {
            sgpaValue.textContent = result.sgpa;
        }

        if (cgpaValue) {
            cgpaValue.textContent = result.cgpa;
        }

        if (creditValue) {
            creditValue.textContent = result.credits;
        }

        if (resultStatus) {
            resultStatus.textContent = result.status;
        }

        if (progressText) {
            progressText.textContent =
                result.cleared + " / " + result.total + " Subjects";
        }

        const progressPercentage =
            Math.round((result.cleared / result.total) * 100);

        if (progressFill) {
            progressFill.style.width = progressPercentage + "%";
        }

        if (progressBar) {
            progressBar.setAttribute(
                "aria-valuenow",
                progressPercentage
            );
        }

        if (progressDescription) {
            progressDescription.textContent =
                progressPercentage +
                "% of the sample semester subjects cleared.";
        }
    }

    if (resultSemester) {

        resultSemester.addEventListener("change", function () {
            displayResults(resultSemester.value);
        });

        displayResults(resultSemester.value);
    }


    /* ======================================
       DOWNLOAD SAMPLE MARKLIST
    ====================================== */

    const downloadResults = document.getElementById("downloadResults");

    if (downloadResults) {

        downloadResults.addEventListener("click", function () {

            const selectedSemester =
                resultSemester ? resultSemester.value : "4";

            const result = semesterResults[selectedSemester];

            if (!result) {
                return;
            }

            const rows = [
                ["KTU RESULTS - DEMONSTRATION DATA"],
                ["Not an official university marklist"],
                ["Semester", selectedSemester],
                ["SGPA", result.sgpa],
                ["CGPA", result.cgpa],
                ["Total Credits", result.credits],
                [],
                ["Subject Code", "Subject Name", "Marks", "Grade", "Status"],
                ...result.subjects
            ];

            const csv = rows.map(function (row) {

                return row.map(function (value) {

                    const text = String(value ?? "");
                    return '"' + text.replace(/"/g, '""') + '"';

                }).join(",");

            }).join("\r\n");

            const blob = new Blob(
                ["\uFEFF" + csv],
                { type: "text/csv;charset=utf-8;" }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "KTU-Demo-Semester-" + selectedSemester + ".csv";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        });
    }

});