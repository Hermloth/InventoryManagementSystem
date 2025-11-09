import pool from "./pool.js";



// GET all settings in DB
async function getAllSettings() {
    const {rows} = await pool.query("SELECT * FROM settings;");
    return rows;
}



async function updateSettings(data){
    console.log("Update Called")
    const {
        stripefees,
        websitefees,
        businessregfees,
        packagingfees,
        domainfees,
        labourperday,
        targetmargin,
        admincosts,
        wixIntegrationEnabled
    } = data


    const result = await pool.query(
        `UPDATE settings SET
            stripe_fees = $1,
            business_registration_calc = $2,
            website_fee_calc = $3,
            packaging_cost = $4,
            labour_cost = $5,
            admin_costs = $6,
            domain_fees = $7,
            target_margin =$8,
            wix_integration_enabled = $9

            RETURNING *`,
            [
                stripefees,
                businessregfees,
                websitefees,
                packagingfees,
                labourperday,
                admincosts,
                domainfees,
                targetmargin,
                wixIntegrationEnabled
            ]
    );

    return result.rowCount ? result.rows[0] : null;
}


const settingsdbQuery = {
    getAllSettings,
    updateSettings,
}

export default settingsdbQuery