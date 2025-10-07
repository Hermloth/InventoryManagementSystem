import "./settings.css";

function Settings(){
    // Set up following settings as REF DATA
    /*
    Website Fees (Yearly)
    Business Registration Fees (Yearly)
    Domain Fees (Yearly)
    Labour (Per Sale)

    Desired Margin (Per Product)
    */

    return <>
    <div>settings page</div>
    <label class="switch">
        <input type="checkbox"/>
        <span class="slider round"></span>
    </label>
    <div className="MainRefData">
        <label>
            Website Fees:
        </label>
        <label>
            Business Registration Fees:
        </label>
        <label>
            Domain Fees:
        </label>
        <label>
            Labour Per Day:
        </label>
        <label>
            Target Margin Per Product:
        </label>
    </div>

    </>
}

export default Settings;