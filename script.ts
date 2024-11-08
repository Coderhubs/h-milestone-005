declare var html2pdf: any;

// Adding submit event listener to the form
document.getElementById('resume-form')?.addEventListener('submit', function (event: Event) { 
    event.preventDefault(); 
    addSkill(); 
    generateResume(); 
});  

// Function to add skills dynamically
function addSkill() { 
    const skillInput = document.getElementById("skills") as HTMLInputElement | null; 
    if (skillInput) { 
        const skillValue = skillInput.value.trim(); 
        if (skillValue) { 
            const skillsList = document.getElementById("skillsList") as HTMLUListElement | null; 
            const listItem = document.createElement("li"); 
            listItem.textContent = skillValue; 
            
            if (skillsList) { 
                skillsList.appendChild(listItem); 
            } 
            
            skillInput.value = ""; // Clear the input after adding skill 
            skillInput.focus();  // Focus back to the skill input field for smooth user experience 
        } 
    } else { 
        console.error("Skill input element not found"); 
    } 
}

// Generate Resume Function
function generateResume(): void { 
    const nameElement = document.getElementById('Name') as HTMLInputElement | null; 
    const contactElement = document.getElementById('Contact') as HTMLInputElement | null; 
    const emailElement = document.getElementById('Emails') as HTMLInputElement | null; 
    const institutionElement = document.getElementById('institution') as HTMLInputElement | null; 
    const qualificationElement = document.getElementById('Qualification') as HTMLInputElement | null; 
    const fieldOfStudyElement = document.getElementById('field-of-study') as HTMLInputElement | null; 
    const startDateElement = document.getElementById('start-date') as HTMLInputElement | null; 
    const endDateElement = document.getElementById('end-date') as HTMLInputElement | null; 
    const descriptionElement = document.getElementById('text') as HTMLTextAreaElement | null; 
    const experienceElement = document.getElementById('experience-text') as HTMLTextAreaElement | null; 
    
    const skillsListContainer = document.getElementById("skillsList") as HTMLUListElement | null;  
    
    let skillsListHTML = ""; 
    if (skillsListContainer) { 
        for (let i = 0; i < skillsListContainer.children.length; i++) { 
            const skillText = skillsListContainer.children[i].textContent?.trim(); 
            if (skillText) { 
                skillsListHTML += `<li>${skillText}</li>`; 
            } 
        } 
    } else { 
        console.error("Skills list container not found!"); 
    }  
    
    if (nameElement && contactElement && emailElement && institutionElement && 
        qualificationElement && fieldOfStudyElement && startDateElement && 
        endDateElement && descriptionElement && experienceElement) { 
    
        const name = nameElement.value; 
        const contact = contactElement.value; 
        const email = emailElement.value; 
        const institution = institutionElement.value; 
        const qualification = qualificationElement.value; 
        const fieldOfStudy = fieldOfStudyElement.value; 
        const startDate = startDateElement.value; 
        const endDate = endDateElement.value; 
        const description = descriptionElement.value; 
        const experience = experienceElement.value; 
    
        const resumeOutputElement = document.getElementById('resume-output') as HTMLElement | null; 
        if (resumeOutputElement) { 
            resumeOutputElement.innerHTML = ` 
                <header class="header" style="background-color: #393939; color: #FFFFFF; padding: 20px; font-family: 'Poppins', sans-serif; margin-top:30px; border: 2px solid #FFA200 ;  ">
                    <h1 style="margin: 10px; color: #FFFFFF;">${name}</h1> 
                </header>
                 <hr>
                <legend style="color: #393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;">Personal Information</legend>
                <hr>
                <p><strong>Contact </strong> ${contact}</p>
                <p><strong>Email</strong> ${email}</p>
                <hr> 
                <legend style="color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5rem;">Education</legend>
                <p><strong>Institution</strong> ${institution}</p>
                <p><strong>Qualification</strong> ${qualification}</p>
                <p><strong>Field of Study</strong> ${fieldOfStudy}</p>
                <p><strong>Start Date</strong> ${startDate}</p>
                <p><strong>End Date</strong> ${endDate}</p>
                <p><strong>Description</strong> ${description}</p>
                <hr> 
                <legend style="color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;">Skills</legend>
                <ul>${skillsListHTML}</ul>
                <hr>
                <legend style="color:#393939; background-color: #cecbcb; padding: 10px; font-size: 1.5em;">Work Experience</legend>
                <p><strong>Experience</strong> ${experience}</p>
            `; 
        } else { 
            console.error('The resume output element is missing'); 
        } 
    } else { 
        console.error('One or more form elements are missing'); 
    } 
}

// Function to download the resume as PDF
document.getElementById('download-btn')?.addEventListener('click', () => {
    downloadPDF();
});

function downloadPDF(): void {
    const resumeElement = document.getElementById('resume-output');
    
    if (resumeElement) {
        const options = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(options).from(resumeElement).save();
    } else {
        console.error('Resume output element not found');
    }
}


// Function to generate a unique identifier
function generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to create a shareable link
function createShareableLink(id: string): string {
    return `${window.location.origin}${window.location.pathname}?share=${id}`;
}

// Function to handle the share button click
function handleShareClick(): void {
    const resumeOutput = document.getElementById('resume-output');
    if (resumeOutput) {
        const uniqueId = generateUniqueId();
        const shareableLink = createShareableLink(uniqueId);

        // Store the resume content
        localStorage.setItem(uniqueId, resumeOutput.innerHTML);

        // Create and display the share popup
        const popup = document.createElement('div');
        popup.className = 'share-popup';
        popup.innerHTML = `
            <div class="share-popup-content">
                <h3>Share your resume</h3>
                <p>Copy this link to share your resume:</p>
                <input type="text" value="${shareableLink}" readonly>
                <button id="copy-link-btn">Copy Link</button>
                <button id="close-popup-btn">Close</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Add copy functionality using `navigator.clipboard.writeText`
        const copyBtn = popup.querySelector('#copy-link-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(shareableLink).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy Link';
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy text:", err);
                });
            });
        }

        // Add close functionality
        const closeBtn = popup.querySelector('#close-popup-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(popup);
            });
        }
    } else {
        console.error('Resume output element not found');
    }
}

// Function to load shared resume
function loadSharedResume(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get('share');

    if (sharedId) {
        const sharedContent = localStorage.getItem(sharedId);
        if (sharedContent) {
            const resumeOutput = document.getElementById('resume-output');
            const resumeForm = document.getElementById('resume-form');
            const btnContainer = document.getElementById('btn');
            if (resumeOutput && resumeForm && btnContainer) {
                resumeOutput.innerHTML = sharedContent;
                resumeForm.style.display = 'none';
                resumeOutput.style.display = 'block';
                btnContainer.style.display = 'flex';
                
                const shareBtn = document.getElementById('share-btn');
                if (shareBtn) {
                    shareBtn.style.display = 'none';
                }
            } else {
                console.error("Required elements (resume-output, resume-form, btn) are missing");
            }
        } else {
            console.error("No shared content found for ID:", sharedId);
        }
    }
}

// Event listener for the share button and to load shared resume on page load
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareClick);
    }
    loadSharedResume(); // Load shared resume on page load if there's a shared link
});

// Add styles for the share popup
const style = document.createElement('style');
style.textContent = `
    .share-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .share-popup-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        max-width: 300px;
        width: 100%;
    }
    .share-popup-content input {
        width: 100%;
        margin-bottom: 10px;
        padding: 5px;
    }
    .share-popup-content button {
        margin: 5px;
        padding: 5px 10px;
    }
`;
document.head.appendChild(style);


