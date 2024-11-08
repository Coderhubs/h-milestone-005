var _a, _b;
// Adding submit event listener to the form
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    addSkill();
    generateResume();
});
// Function to add skills dynamically
function addSkill() {
    var skillInput = document.getElementById("skills");
    if (skillInput) {
        var skillValue = skillInput.value.trim();
        if (skillValue) {
            var skillsList = document.getElementById("skillsList");
            var listItem = document.createElement("li");
            listItem.textContent = skillValue;
            if (skillsList) {
                skillsList.appendChild(listItem);
            }
            skillInput.value = ""; // Clear the input after adding skill 
            skillInput.focus(); // Focus back to the skill input field for smooth user experience 
        }
    }
    else {
        console.error("Skill input element not found");
    }
}
// Generate Resume Function
function generateResume() {
    var _a;
    var nameElement = document.getElementById('Name');
    var contactElement = document.getElementById('Contact');
    var emailElement = document.getElementById('Emails');
    var institutionElement = document.getElementById('institution');
    var qualificationElement = document.getElementById('Qualification');
    var fieldOfStudyElement = document.getElementById('field-of-study');
    var startDateElement = document.getElementById('start-date');
    var endDateElement = document.getElementById('end-date');
    var descriptionElement = document.getElementById('text');
    var experienceElement = document.getElementById('experience-text');
    var skillsListContainer = document.getElementById("skillsList");
    var skillsListHTML = "";
    if (skillsListContainer) {
        for (var i = 0; i < skillsListContainer.children.length; i++) {
            var skillText = (_a = skillsListContainer.children[i].textContent) === null || _a === void 0 ? void 0 : _a.trim();
            if (skillText) {
                skillsListHTML += "<li>".concat(skillText, "</li>");
            }
        }
    }
    else {
        console.error("Skills list container not found!");
    }
    if (nameElement && contactElement && emailElement && institutionElement &&
        qualificationElement && fieldOfStudyElement && startDateElement &&
        endDateElement && descriptionElement && experienceElement) {
        var name_1 = nameElement.value;
        var contact = contactElement.value;
        var email = emailElement.value;
        var institution = institutionElement.value;
        var qualification = qualificationElement.value;
        var fieldOfStudy = fieldOfStudyElement.value;
        var startDate = startDateElement.value;
        var endDate = endDateElement.value;
        var description = descriptionElement.value;
        var experience = experienceElement.value;
        var resumeOutputElement = document.getElementById('resume-output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = " \n                <header class=\"header\" style=\"background-color: #393939; color: #FFFFFF; padding: 20px; font-family: 'Poppins', sans-serif; margin-top:30px; border: 2px solid #FFA200 ;  \">\n                    <h1 style=\"margin: 10px; color: #FFFFFF;\">".concat(name_1, "</h1> \n                </header>\n                 <hr>\n                <legend style=\"color: #393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;\">Personal Information</legend>\n                <hr>\n                <p><strong>Contact </strong> ").concat(contact, "</p>\n                <p><strong>Email</strong> ").concat(email, "</p>\n                <hr> \n                <legend style=\"color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5rem;\">Education</legend>\n                <p><strong>Institution</strong> ").concat(institution, "</p>\n                <p><strong>Qualification</strong> ").concat(qualification, "</p>\n                <p><strong>Field of Study</strong> ").concat(fieldOfStudy, "</p>\n                <p><strong>Start Date</strong> ").concat(startDate, "</p>\n                <p><strong>End Date</strong> ").concat(endDate, "</p>\n                <p><strong>Description</strong> ").concat(description, "</p>\n                <hr> \n                <legend style=\"color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;\">Skills</legend>\n                <ul>").concat(skillsListHTML, "</ul>\n                <hr>\n                <legend style=\"color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;\">Work Experience</legend>\n                <p><strong>Experience</strong> ").concat(experience, "</p>\n            ");
        }
        else {
            console.error('The resume output element is missing');
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
}
// Function to download the resume as PDF
(_b = document.getElementById('download-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    downloadPDF();
});
function downloadPDF() {
    var resumeElement = document.getElementById('resume-output');
    if (resumeElement) {
        var options = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(options).from(resumeElement).save();
    }
    else {
        console.error('Resume output element not found');
    }
}
// Function to generate a unique identifier
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
// Function to create a shareable link
function createShareableLink(id) {
    return "".concat(window.location.origin).concat(window.location.pathname, "?share=").concat(id);
}
// Function to handle the share button click
function handleShareClick() {
    var resumeOutput = document.getElementById('resume-output');
    if (resumeOutput) {
        var uniqueId = generateUniqueId();
        var shareableLink_1 = createShareableLink(uniqueId);
        // Store the resume content
        localStorage.setItem(uniqueId, resumeOutput.innerHTML);
        // Create and display the share popup
        var popup_1 = document.createElement('div');
        popup_1.className = 'share-popup';
        popup_1.innerHTML = "\n            <div class=\"share-popup-content\">\n                <h3>Share your resume</h3>\n                <p>Copy this link to share your resume:</p>\n                <input type=\"text\" value=\"".concat(shareableLink_1, "\" readonly>\n                <button id=\"copy-link-btn\">Copy Link</button>\n                <button id=\"close-popup-btn\">Close</button>\n            </div>\n        ");
        document.body.appendChild(popup_1);
        // Add copy functionality using `navigator.clipboard.writeText`
        var copyBtn_1 = popup_1.querySelector('#copy-link-btn');
        if (copyBtn_1) {
            copyBtn_1.addEventListener('click', function () {
                navigator.clipboard.writeText(shareableLink_1).then(function () {
                    copyBtn_1.textContent = 'Copied!';
                    setTimeout(function () {
                        copyBtn_1.textContent = 'Copy Link';
                    }, 2000);
                }).catch(function (err) {
                    console.error("Failed to copy text:", err);
                });
            });
        }
        // Add close functionality
        var closeBtn = popup_1.querySelector('#close-popup-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                document.body.removeChild(popup_1);
            });
        }
    }
    else {
        console.error('Resume output element not found');
    }
}
// Function to load shared resume
function loadSharedResume() {
    var urlParams = new URLSearchParams(window.location.search);
    var sharedId = urlParams.get('share');
    if (sharedId) {
        var sharedContent = localStorage.getItem(sharedId);
        if (sharedContent) {
            var resumeOutput = document.getElementById('resume-output');
            var resumeForm = document.getElementById('resume-form');
            var btnContainer = document.getElementById('btn');
            if (resumeOutput && resumeForm && btnContainer) {
                resumeOutput.innerHTML = sharedContent;
                resumeForm.style.display = 'none';
                resumeOutput.style.display = 'block';
                btnContainer.style.display = 'flex';
                var shareBtn = document.getElementById('share-btn');
                if (shareBtn) {
                    shareBtn.style.display = 'none';
                }
            }
            else {
                console.error("Required elements (resume-output, resume-form, btn) are missing");
            }
        }
        else {
            console.error("No shared content found for ID:", sharedId);
        }
    }
}
// Event listener for the share button and to load shared resume on page load
document.addEventListener('DOMContentLoaded', function () {
    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareClick);
    }
    loadSharedResume(); // Load shared resume on page load if there's a shared link
});
// Add styles for the share popup
var style = document.createElement('style');
style.textContent = "\n    .share-popup {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.7);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 1000;\n    }\n    .share-popup-content {\n        background-color: white;\n        padding: 20px;\n        border-radius: 5px;\n        text-align: center;\n        max-width: 300px;\n        width: 100%;\n    }\n    .share-popup-content input {\n        width: 100%;\n        margin-bottom: 10px;\n        padding: 5px;\n    }\n    .share-popup-content button {\n        margin: 5px;\n        padding: 5px 10px;\n    }\n";
document.head.appendChild(style);
