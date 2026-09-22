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
