import { useNavigate } from "react-router-dom";
import "./settings.css";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Settings(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [wixIntegrationEnabled, setWixIntegrationEnabled] = useState(false);
    const [formData, setFormData] = useState({
        stripefees: "",
        websitefees: "",
        businessregfees: "",
        packagingfees: "",
        domainfees: "",
        labourperday: "",
        targetmargin: "",
        admincosts: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

        function handleWixToggle(e) {
        setWixIntegrationEnabled(e.target.checked);
        // TODO: Save this setting to backend
        toast.info(e.target.checked ? "Wix Integration Enabled" : "Wix Integration Disabled");
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        try{
        // Include wixIntegrationEnabled in the data being sent
        const dataToSubmit = {
            ...formData,
            wixIntegrationEnabled
        };

        const res = await fetch(`/api/settings`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSubmit),
        });

        if (res.ok) {
                    toast.success("Settings updated successfully!", { autoClose: 3000 });
                } else {
                    const err = await res.json();
                    toast.error(err.error || "Failed to update settings");
                }
            } catch (err) {
                console.error("Submit failed:", err);
                toast.error("Network error: could not update settings");
            }
    }

    useEffect(()=> {
        async function fetchSettings(){
            try{
                const res = await fetch(`/api/settings`)
                if(!res.ok){throw new Error("Failed to fetch settings")}

                const data = await res.json();
                setFormData({
                    stripefees: data.stripe_fees || "",
                    websitefees: data.website_fee_calc || "",
                    businessregfees: data.business_registration_calc || "",
                    packagingfees: data.packaging_cost || "",
                    domainfees: data.domain_fees || "",
                    labourperday: data.labour_cost || "",
                    targetmargin: data.target_margin || "",
                    admincosts: data.admin_costs || ""
                })
                // TODO: Fetch wix_integration_enabled from backend
                setWixIntegrationEnabled(data.wix_integration_enabled || false);
            } catch (error) {
                console.error("Error fetching settings", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    },[])

    if (loading) return <p>Loading settings...</p>;

    return <>
        <ToastContainer position="bottom-right" />
<div className="SettingsContainer"> 
<h1 className="SettingsTitle">Settings</h1>

                <div className="SettingsSection">
                <div className="IntegrationToggleContainer">
                    <div className="IntegrationInfo">
                        <h3>Wix Integration</h3>
                        <p>Automatically sync stock levels with your Wix store when sales are made</p>
                    </div>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={wixIntegrationEnabled}
                            onChange={handleWixToggle}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>


    <form onSubmit={handleSubmit} className="EditProductForm">
        <div className="MainRefData">
            <label>
                Stripe Fees:
                <input
                className="formField"
                type="number"
                name="stripefees"
                value={formData.stripefees}
                onChange={handleChange}
                />
            </label>
            <label>
                Website Fees:
                <input
                className="formField"
                type="number"
                name="websitefees"
                value={formData.websitefees}
                onChange={handleChange}
                />
            </label>
            <label>
                Business Registration Fees:
                <input
                className="formField"
                type="number"
                name="businessregfees"
                value={formData.businessregfees}
                onChange={handleChange}
                />
            </label>
            <label>
                Packaging Fees:
                <input
                className="formField"
                type="number"
                name="packagingfees"
                value={formData.packagingfees}
                onChange={handleChange}
                />
            </label>
            <label>
                Domain Fees:
                <input
                className="formField"
                type="number"
                name="domainfees"
                value={formData.domainfees}
                onChange={handleChange}
                />
            </label>
            <label>
                Labour Per Day:
                <input
                className="formField"
                type="number"
                name="labourperday"
                value={formData.labourperday}
                onChange={handleChange}
                />
            </label>
            <label>
                Target Margin Per Product:
                <input
                className="formField"
                type="number"
                name="targetmargin"
                value={formData.targetmargin}
                onChange={handleChange}
                />
            </label>
            <label>
                Admin Costs:
                <input
                className="formField"
                type="number"
                name="admincosts"
                value={formData.admincosts}
                onChange={handleChange}
                />
            </label>
            <button
            className="SubmitButton"
            type="submit"
            >Update Settings</button>
        </div>
    </form>
    </div>   


    </>
}

export default Settings;