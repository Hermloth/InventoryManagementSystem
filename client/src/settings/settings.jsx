import { useNavigate } from "react-router-dom";
import "./settings.css";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Settings(){
    // Set up following settings as REF DATA
    /*
    Website Fees (Yearly)
    Business Registration Fees (Yearly)
    Domain Fees (Yearly)
    Labour (Per Sale)

    Desired Margin (Per Product)
    */
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
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

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const res = await fetch(`/api/settings`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Settings updated successfully!", { autoClose: 3000 });
                navigate("/settings", { state: { reload: true } });
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to update settings");
            }
        } catch {
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


    <div>settings page</div>
    <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"></span>
    </label>
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


    </>
}

export default Settings;