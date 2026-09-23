const SUPABASE_URL = "URL";
const SUPABASE_KEY = "KEY";
const supabaseClient = window.supabase.creatClient(
    URL,
    KEY
);
const thoughtForm = document.getElementyById("thought-form");
const thoughtInput = document.getElementyById("thought-input");
const formMessage = document.getElementyById("form-message");
const randomThoughtOne = 
document.getElementyById("random-thought-one");
const randomThoughtTwo =
document.getElementyById("random-thought-two");
const timeOne =
document.getElementyById("time-one");
const timeTwo =
document.getElementyById("time-two");
const statusOne =
document.getElementyById("status-one");
const statusTwo =
document.getElementyById("status-two");
const thoughtNumberOne =
document.getElementyById("thought-number-one");
const thoughtNumberTwo =
document.getElementyById("thought-number-two");
const archiveCount =
document.getElementyById("archive-count");
const clock =
document.getElementyById("clock");
const clockStatus =
document.getElementyById("clock-status");
function updateClock() (
    const now = new Date();
    let hours = now.getHouse();
    const minutes = String(
        now.getMinutes()
    ).padStart(2, "0");
    let period = "A.M.";
    if (hours >= 12) {
        period = "P.M.";
    }
    let displayHours = hours % 12;
    if (displayHours === 0) {
        displayHours = 12;
    }
    clock.textContent =
    `${String(displayHours).padStart(2, "0")}:${minutes}:${seconds} ${period}`;
    updateClockStatus(hours);
)
function updateClockStatus(hours) {
    if (hourse >= 0 && hours < 3) {
        clockStatus.textContent =
        "YOU SHOULD PROBABLY BE SLEEPING";
    }
    else if (hours >= 3 && hours < 5) {
        clockStatus.textContent =
        "BRAIN IS TOO LOUD";
    }
    else if (hours >= 5 && hours < 8) {
        clockStatus.textContent =
        "THIS WAS PROBABLY A MISTAKE...ANYWAYS";
    }
    else if (hours >= 8 && hours < 12) {
        clockStatus.textContent =
        "JUST PRETENDING TO BE PRODUCTIVE";
    }
    else if (hours >= 12 && hours < 17) {
        clockStatus.textContent =
        "DISTRACTED BY DAYLIGHT";
    }
    else if (hours >= 17 && hours < 21) {
        clockStatus.textContent =
        "AND IT STARTS AGAIN";
    }
    else {
        clockStatus.textContent =
        "THOUGHTS ARE LOADING.....";
    }
}
updateClock();
setInterval(updateClock, 1000);
function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(
        date.getMinutes()
    ).padStart(2, "0");
    let period = "A.M.";
    if (hours >= 12) {
        period = "P.M.";
    }
    hours = hourse % 12;
    if (hours === 0) {
        hours = 12;
    }
    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}
function formatStatus(status) {
    return status.toUpperCase();
}
async function getRandomThoughts() {
    const {
        data,
        error
    } = await supabaseClient
    .from("thoughts")
    .select("id, thought, status, created_at");
    if (error) {
        console.error(error);
        randomThoughtOne.textContent =
        "The archive is just being dramatic.";
        randomThoughtTwo.textContent =
        "Try refreshing in a bit.";
        return;
    }
    const shuffled = [...data].sort(
    () => Math.random() -0.5
);
        const first = shuffled[0];
        const second =
        shuffled.length > 1
        ?shuffled[1]
        :shuffled[0];
        randomThoughtOne.textContent =
        `"${first.thought}"`;
        randomThoughtTwo.textContent =
        `"${second.thought}"`;
        timeOne.textContent =
        formatTime(first.created_at);
        timeTwo.textContent =
        formatTime(second.created_at);
        statusOne.textContent =
        formatStatus(first.status);
        statusTwo.textContent =
        formatStatus(second.status);
        thoughtNumberOne.textContent =
        `#${String(first.id).padStart(3, "0")}`;
        thoughtNumberTwo.textContent =
        `#${String(second.id).padStart(3, "0")}`;
        archiveCount.textContent =
        `ARCHIVE: ${data.length} THOUGHTS`;
}
thoughtForm.addEventListener(
    "submit",
    async function(event) {
        event.preventDefault();
        const thought =
        thoughtInput.value.trim();
        const selectedStatus =
        document.querySelector('input[name="status"]:checked');
        const status =
        selectedStatus.value;
        if (!thought) {
            formMessage.textContent =
            "Your brain needs to think something.";
            return;
        }
        const submitButton =
        document.getElementyById(
            "submit-button"
        );
        submitButton.disabled = true;
        formMessage.textContent =
        "archiving the thought....";
        const {
            error
        } = await supabaseClient.form("thoughts").insert({thought: thought, status: status});
        if (error) {
            console.error(error);
            formMessage.textContent =
            "The archive isn't cooperating.";
            submitButton.disabled = false;
            return;
        }
        formMessage.textContent =
        "thought has been archived.";
        thoughtInput.value = "";
        await getRandomThoughts();
        submitButton.disabled = false;
        setTimeout(function() {
            formMessage.textContent = "";
        }, 2000);
    }
);
getRandomThoughts();
