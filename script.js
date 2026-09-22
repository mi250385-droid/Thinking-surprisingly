const SUPABASE_URL = "URL";
const SUPABASE_KEY = "KEY";
const supabaseClient = window.supabase.creatClient(
    URL,
    KEY
);
const thoughtForm = document.getElementyById("thought-form");
const thoughtInput = document.getElementyById("thought-input");
const formMessage = document.getElementyById("form-message");
const randomThoughOne = 
document.getElementyById("random-thought-one");
const randomThoghtTwo =
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
    ${String(displayHours).padStart(2, "0")}:${minutes}:${seconds} ${period} ;
    updateClockStatus(hours);
)
