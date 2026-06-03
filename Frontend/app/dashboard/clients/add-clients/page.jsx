"use client";

import { useState } from "react";

/* ================= TABS ================= */
const tabs = [
  "Client Info",
  "Client Calendar",
  "Address",
  "Other Details",
  "Additional Fields",
];

/* ================= INPUT STYLE ================= */
const inputClass =
  "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-400";

/* ================= LABEL MAPS ================= */
const addressLabels = {
  billingAddress: "Billing Address",
  country: "Country",
  hqAddress: "HQ Address",
  city: "City",
  state: "State",
  zip: "ZIP Code",
  phone: "Phone",
  fax: "Fax",
};

const otherDetailsLabels = {
  taxTreatment: "Tax Treatment",
  placeOfSupply: "Place of Supply",
  currency: "Currency",
  paymentTerms: "Payment Terms",
  portalLanguage: "Portal Language",
};

/* ================= REUSABLE FIELD ================= */
function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputClass} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

/* ================= PAGE ================= */
export default function AddClientPage() {
  const [activeTab, setActiveTab] = useState("Client Info");

  /* ================= STATES ================= */
  const [clientInfo, setClientInfo] = useState({
    customerType: "Business",
    customerId: "3108",
    companyName: "",
    industry: "IT",
    displayName: "",
    email: "",
    customerNumber: "",
    phone: "",
  });

  const [calendar, setCalendar] = useState({
    year: "2024",
    weekend: "",
    leaves: [{ type: "", date: "" }],
  });

  const [address, setAddress] = useState({
    billingAddress: "",
    country: "",
    hqAddress: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
  });

  const [otherDetails, setOtherDetails] = useState({
    taxTreatment: "",
    placeOfSupply: "",
    currency: "",
    paymentTerms: "",
    portalLanguage: "",
    documents: null,
  });

  /* ================= ACTIONS ================= */
  const handleSave = () => {
    console.log("FULL FORM DATA 👉", {
      clientInfo,
      calendar,
      address,
      otherDetails,
    });
    alert("Client saved successfully!");
  };

  const handleCancel = () => {
    alert("Form reset");
  };

  /* ================= UI ================= */
  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      <h1 className="mb-6 text-3xl font-bold">Add Client</h1>

      {/* ===== TABS ===== */}
      <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow">
        <div className="flex gap-2 overflow-x-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-3 text-sm font-medium ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-600 hover:bg-gray-100 rounded-md"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CONTENT CARD ===== */}
      <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8">

        {/* ================= CLIENT INFO ================= */}
        {activeTab === "Client Info" && (
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium">
                Customer Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-3 flex gap-4">
                {["Business", "Individual"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setClientInfo({ ...clientInfo, customerType: type })
                    }
                    className={`px-6 py-2 rounded-full text-sm font-medium border ${
                      clientInfo.customerType === type
                        ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Field label="Customer ID" value={clientInfo.customerId} disabled />
              <Field label="Company Name" required value={clientInfo.companyName}
                onChange={(v) => setClientInfo({ ...clientInfo, companyName: v })} />
              <Field label="Industry" required value={clientInfo.industry}
                onChange={(v) => setClientInfo({ ...clientInfo, industry: v })} />
              <Field label="Display Name" required value={clientInfo.displayName}
                onChange={(v) => setClientInfo({ ...clientInfo, displayName: v })} />
              <Field label="Email" type="email" required value={clientInfo.email}
                onChange={(v) => setClientInfo({ ...clientInfo, email: v })} />
              <Field label="Customer Number" required value={clientInfo.customerNumber}
                onChange={(v) => setClientInfo({ ...clientInfo, customerNumber: v })} />
              <Field label="Phone" required value={clientInfo.phone}
                onChange={(v) => setClientInfo({ ...clientInfo, phone: v })} />
            </div>
          </div>
        )}

        {/* ================= CLIENT CALENDAR ================= */}
        {activeTab === "Client Calendar" && (
          <div className="space-y-6">
            <Field
              label="Calendar Year"
              value={calendar.year}
              onChange={(v) => setCalendar({ ...calendar, year: v })}
            />
            <Field
              label="Weekend"
              value={calendar.weekend}
              onChange={(v) => setCalendar({ ...calendar, weekend: v })}
            />
          </div>
        )}

        {/* ================= ADDRESS ================= */}
        {activeTab === "Address" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(address).map(([key, value]) => (
              <Field
                key={key}
                label={addressLabels[key]}
                value={value}
                onChange={(v) => setAddress({ ...address, [key]: v })}
              />
            ))}
          </div>
        )}

        {/* ================= OTHER DETAILS ================= */}
        {activeTab === "Other Details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(otherDetails).map(([key, value]) =>
              key === "documents" ? (
                <div key={key}>
                  <label className="text-sm font-medium">Documents</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setOtherDetails({
                        ...otherDetails,
                        documents: e.target.files?.[0],
                      })
                    }
                  />
                </div>
              ) : (
                <Field
                  key={key}
                  label={otherDetailsLabels[key]}
                  value={value}
                  onChange={(v) =>
                    setOtherDetails({ ...otherDetails, [key]: v })
                  }
                />
              )
            )}
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        {activeTab === "Additional Fields" && (
          <div className="flex justify-center gap-6 py-10">
            <button
              onClick={handleSave}
              className="px-12 py-3 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white font-medium shadow"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-12 py-3 rounded-xl bg-gray-200 font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
