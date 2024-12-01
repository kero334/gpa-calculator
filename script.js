document.addEventListener("DOMContentLoaded", () => {
    let gpaCounter = 0;
    let midtermCounter = 0;

    // إضافة مادة جديدة لحساب GPA
    document.getElementById("add-gpa-subject").addEventListener("click", () => {
        gpaCounter++;
        const container = document.getElementById("gpa-container");
        const newSubject = `
            <div class="card" id="gpa-subject-${gpaCounter}">
                <h4>مادة ${gpaCounter}</h4>
                <label for="gpa-subject-name-${gpaCounter}">اسم المادة:</label>
                <input type="text" id="gpa-subject-name-${gpaCounter}" placeholder="اسم المادة">

                <label for="gpa-max-grade-${gpaCounter}">الدرجة النهائية:</label>
                <input type="number" id="gpa-max-grade-${gpaCounter}" placeholder="الدرجة النهائية">

                <label for="gpa-student-grade-${gpaCounter}">درجة الطالب:</label>
                <input type="number" id="gpa-student-grade-${gpaCounter}" placeholder="درجة الطالب">
            </div>
        `;
        container.insertAdjacentHTML("beforeend", newSubject);
    });

    // حساب GPA
    document.getElementById("calculate-gpa").addEventListener("click", () => {
        let totalPoints = 0;
        let totalCredits = 0;

        // التكرار على جميع المواد لحساب الـ GPA
        for (let i = 1; i <= gpaCounter; i++) {
            const maxGrade = parseFloat(document.getElementById(`gpa-max-grade-${i}`).value);
            const studentGrade = parseFloat(document.getElementById(`gpa-student-grade-${i}`).value);

            if (maxGrade && studentGrade) {
                totalPoints += studentGrade;
                totalCredits += maxGrade;
            }
        }

        // حساب GPA النهائي
        const gpa = totalPoints / totalCredits;

        // عرض النتيجة
        document.getElementById("gpa-results").innerHTML = `
            <h3>الـ GPA هو: ${gpa.toFixed(2)}</h3>
        `;
    });

    // إضافة مادة جديدة لحساب الدرجات المطلوبة لتقدير معين
    document.getElementById("add-midterm-subject").addEventListener("click", () => {
        midtermCounter++;
        const container = document.getElementById("midterm-container");
        const newSubject = `
            <div class="card" id="midterm-subject-${midtermCounter}">
                <h4>مادة ${midtermCounter}</h4>
                <label for="midterm-subject-name-${midtermCounter}">اسم المادة:</label>
                <input type="text" id="midterm-subject-name-${midtermCounter}" placeholder="اسم المادة">

                <label for="midterm-max-grade-${midtermCounter}">الدرجة النهائية:</label>
                <input type="number" id="midterm-max-grade-${midtermCounter}" placeholder="الدرجة النهائية">

                <label for="midterm-student-grade-${midtermCounter}">درجة الطالب:</label>
                <input type="number" id="midterm-student-grade-${midtermCounter}" placeholder="درجة الطالب">
            </div>
        `;
        container.insertAdjacentHTML("beforeend", newSubject);
    });

    // حساب التقدير المطلوب
    document.getElementById("calculate-midterm").addEventListener("click", () => {
        const desiredGPA = parseFloat(document.getElementById("desired-gpa").value);
        const midtermGradesRequired = [];

        // التكرار على جميع المواد لحساب الدرجات المطلوبة
        for (let i = 1; i <= midtermCounter; i++) {
            const maxGrade = parseFloat(document.getElementById(`midterm-max-grade-${i}`).value);
            const studentGrade = parseFloat(document.getElementById(`midterm-student-grade-${i}`).value);

            if (maxGrade && studentGrade) {
                // حساب الدرجة المطلوبة للوصول إلى الـ GPA المطلوب
                const gradeRequired = (desiredGPA * maxGrade - studentGrade) / maxGrade * 4;
                midtermGradesRequired.push({
                    subject: document.getElementById(`midterm-subject-name-${i}`).value,
                    gradeRequired: gradeRequired.toFixed(2)
                });
            }
        }

        // عرض النتيجة
        let resultHtml = `
            <h3>لكي تجيب تقدير بـ ${desiredGPA}</h3>
        `;
        midtermGradesRequired.forEach(item => {
            resultHtml += `
                <p>اسم المادة: ${item.subject} - الدرجة المطلوبة: ${item.gradeRequired}</p>
            `;
        });
        document.getElementById("midterm-results").innerHTML = resultHtml;
    });
});
