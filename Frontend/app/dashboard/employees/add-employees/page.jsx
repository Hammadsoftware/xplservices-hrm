"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";

// ─── Constants ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "auth",       label: "Account",  icon: "⬡", subtitle: "Login credentials & role" },
  { id: "basic",      label: "Personal", icon: "◈", subtitle: "Identity & personal info" },
  { id: "work",       label: "Work",     icon: "◉", subtitle: "Employment details" },
  { id: "contact",    label: "Contact",  icon: "◎", subtitle: "Phone & address" },
  { id: "bank",       label: "Banking",  icon: "▣", subtitle: "Payment information" },
  { id: "travel",     label: "Travel",   icon: "◆", subtitle: "Entry & exit records" },
  { id: "separation", label: "Exit",     icon: "◐", subtitle: "Offboarding details" },
];

const INITIAL = {
  username: "", password: "", role: "EMPLOYEE", isActive: true,
  firstName: "", lastName: "", email: "", nickName: "", dob: "", age: "",
  gender: "", maritalStatus: "", nationality: "", skills: "", linkedin: "", twitter: "",
  employeeId: "", employmentType: "", jobTitle: "", position: "", department: "",
  businessUnit: "", reportingManager: "", workLocation: "", remoteRate: "", onsiteRate: "",
  rateBasis: "", dateOfJoining: "", employeeStatus: "", leavePolicy: "", timesheetRequired: false,
  workPhone: "", personalPhone: "", presentAddress: "", permanentAddress: "",
  emergencyName: "", relationship: "", emergencyPhone: "",
  bankName: "", bankCountry: "", accountType: "", accountNumber: "", iban: "",
  routingCode: "", swiftCode: "", ifscCode: "",
  firstEntry: "", latestExit: "", latestEntry: "", daysFromEntry: "",
  exitDate: "", exitReason: "", canJoinAgain: false,
};

const RULES = {
  username:       { required: true,  minLen: 3, pattern: /^[a-zA-Z0-9_]+$/,         msg: "Letters, numbers & underscores only. Min 3 chars." },
  password:       { required: true,  minLen: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)/, msg: "Min 8 chars with letters and numbers." },
  firstName:      { required: true,  pattern: /^[a-zA-Z\s\-']+$/,                   msg: "Letters, spaces and hyphens only." },
  lastName:       { required: true,  pattern: /^[a-zA-Z\s\-']+$/,                   msg: "Letters, spaces and hyphens only." },
  email:          { required: true,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,         msg: "Enter a valid email address." },
  employeeId:     { required: true,  pattern: /^[A-Z0-9\-]+$/i,                     msg: "Alphanumeric characters and hyphens only." },
  employmentType: { required: true },
  jobTitle:       { required: true },
  position:       { required: true },
  workLocation:   { required: true },
  age:            { pattern: /^\d+$/,                                                msg: "Age must be between 18 and 80." },
  workPhone:      { pattern: /^[+\d\s\-()]{7,20}$/,                                 msg: "Enter a valid phone number." },
  personalPhone:  { pattern: /^[+\d\s\-()]{7,20}$/,                                 msg: "Enter a valid phone number." },
  emergencyPhone: { pattern: /^[+\d\s\-()]{7,20}$/,                                 msg: "Enter a valid phone number." },
  linkedin:       { pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/,           msg: "Enter a valid LinkedIn URL." },
  twitter:        { pattern: /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/,            msg: "Enter a valid Twitter URL." },
  remoteRate:     { pattern: /^\d+(\.\d{1,2})?$/,                                   msg: "Numeric value only (e.g. 25.50)." },
  onsiteRate:     { pattern: /^\d+(\.\d{1,2})?$/,                                   msg: "Numeric value only (e.g. 25.50)." },
  daysFromEntry:  { pattern: /^\d+$/,                                                msg: "Must be a whole number." },
  accountNumber:  { pattern: /^[A-Z0-9]{5,30}$/i,                                   msg: "5–30 alphanumeric characters." },
  iban:           { pattern: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,                      msg: "Format: 2 letters + 2 digits + up to 30 chars." },
  swiftCode:      { pattern: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/i,      msg: "8 or 11 character SWIFT/BIC code." },
  ifscCode:       { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/i,                            msg: "4 letters + 0 + 6 alphanumeric chars." },
};

function validate(field, value) {
  const rule = RULES[field];
  if (!rule) return "";
  const str = String(value ?? "").trim();
  if (rule.required && !str) return "This field is required.";
  if (!str) return "";
  if (rule.minLen && str.length < rule.minLen) return `Minimum ${rule.minLen} characters required.`;
  if (rule.pattern && !rule.pattern.test(str)) return rule.msg || "Invalid format.";
  if (field === "age") {
    const n = parseInt(str);
    if (isNaN(n) || n < 18 || n > 80) return "Age must be between 18 and 80.";
  }
  return "";
}

function autoCorrect(field, value) {
  switch (field) {
    case "email":          return value.toLowerCase().trim();
    case "username":       return value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 30);
    case "employeeId":     return value.toUpperCase().replace(/[^A-Z0-9\-]/g, "").slice(0, 20);
    case "firstName":
    case "lastName":
    case "nickName":       return value.replace(/[^a-zA-Z\s\-']/g, "").replace(/\s{2,}/g, " ");
    case "workPhone":
    case "personalPhone":
    case "emergencyPhone": return value.replace(/[^+\d\s\-()]/g, "").slice(0, 20);
    case "age":
    case "daysFromEntry":  return value.replace(/\D/g, "").slice(0, 3);
    case "remoteRate":
    case "onsiteRate":     return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    case "accountNumber":  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 30);
    case "iban":           return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 34);
    case "swiftCode":      return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
    case "ifscCode":       return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
    case "routingCode":    return value.replace(/[^0-9]/g, "").slice(0, 9);
    default:               return value;
  }
}

// ─── UI Components ────────────────────────────────────────────────────────────
function Label({ text, required }) {
  return (
    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>
      {text} {required && <span style={{ color: "#f43f5e" }}>*</span>}
    </label>
  );
}

function ErrorMsg({ msg }) {
  if (!msg) return null;
  return <p style={{ marginTop: "6px", fontSize: "11px", color: "#f43f5e", display: "flex", alignItems: "center", gap: "4px" }}><span>⚠</span> {msg}</p>;
}

function HintMsg({ msg }) {
  if (!msg) return null;
  return <p style={{ marginTop: "6px", fontSize: "11px", color: "#94a3b8", fontStyle: "italic", fontFamily: "'DM Mono', monospace" }}>{msg}</p>;
}

function inputStyle(hasErr) {
  return {
    width: "100%", boxSizing: "border-box", background: "#fff",
    border: hasErr ? "1.5px solid #f43f5e" : "1.5px solid #e2e8f0",
    borderRadius: "8px", padding: "10px 14px",
    fontSize: "13.5px", color: "#1e293b",
    outline: "none", transition: "border 0.15s, box-shadow 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  };
}

function Input({ label, field, form, errors, touched, onChange, onBlur, type = "text", placeholder = "", hint, required, style = {} }) {
  const err = touched[field] ? errors[field] : undefined;
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <Label text={label} required={required} />
      <input
        type={type} value={form[field] ?? ""} placeholder={placeholder} autoComplete="off"
        onChange={e => onChange(field, e.target.value)}
        onBlur={() => { onBlur(field); setFocused(false); }}
        onFocus={() => setFocused(true)}
        style={{ ...inputStyle(err), ...(focused ? { borderColor: err ? "#f43f5e" : "#0ea5e9", boxShadow: err ? "0 0 0 3px rgba(244,63,94,0.12)" : "0 0 0 3px rgba(14,165,233,0.12)" } : {}) }}
      />
      {err ? <ErrorMsg msg={err} /> : <HintMsg msg={hint} />}
    </div>
  );
}

function PwInput({ label, field, form, errors, touched, onChange, onBlur, required, style = {} }) {
  const err = touched[field] ? errors[field] : undefined;
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <Label text={label} required={required} />
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"} value={form[field] ?? ""} autoComplete="new-password"
          onChange={e => onChange(field, e.target.value)}
          onBlur={() => { onBlur(field); setFocused(false); }}
          onFocus={() => setFocused(true)}
          style={{ ...inputStyle(err), paddingRight: "44px", ...(focused ? { borderColor: err ? "#f43f5e" : "#0ea5e9", boxShadow: err ? "0 0 0 3px rgba(244,63,94,0.12)" : "0 0 0 3px rgba(14,165,233,0.12)" } : {}) }}
        />
        <button type="button" onClick={() => setShow(s => !s)}
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "13px", padding: "2px" }}>
          {show ? "🙈" : "👁"}
        </button>
      </div>
      {err && <ErrorMsg msg={err} />}
    </div>
  );
}

function Select({ label, field, form, errors, touched, onChange, onBlur, options, required, style = {} }) {
  const err = touched[field] ? errors[field] : undefined;
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <Label text={label} required={required} />
      <div style={{ position: "relative" }}>
        <select
          value={form[field] ?? ""}
          onChange={e => onChange(field, e.target.value)}
          onBlur={() => { onBlur(field); setFocused(false); }}
          onFocus={() => setFocused(true)}
          style={{ ...inputStyle(err), appearance: "none", cursor: "pointer", color: form[field] ? "#1e293b" : "#94a3b8", ...(focused ? { borderColor: err ? "#f43f5e" : "#0ea5e9", boxShadow: err ? "0 0 0 3px rgba(244,63,94,0.12)" : "0 0 0 3px rgba(14,165,233,0.12)" } : {}) }}
        >
          <option value="">— Select —</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: "11px" }}>▼</span>
      </div>
      {err && <ErrorMsg msg={err} />}
    </div>
  );
}

function Textarea({ label, field, form, errors, touched, onChange, onBlur, placeholder = "", required, style = {} }) {
  const err = touched[field] ? errors[field] : undefined;
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <Label text={label} required={required} />
      <textarea
        value={form[field] ?? ""} placeholder={placeholder} rows={3}
        onChange={e => onChange(field, e.target.value)}
        onBlur={() => { onBlur(field); setFocused(false); }}
        onFocus={() => setFocused(true)}
        style={{ ...inputStyle(err), resize: "none", ...(focused ? { borderColor: err ? "#f43f5e" : "#0ea5e9", boxShadow: err ? "0 0 0 3px rgba(244,63,94,0.12)" : "0 0 0 3px rgba(14,165,233,0.12)" } : {}) }}
      />
      {err && <ErrorMsg msg={err} />}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px" }}>
      <div>
        <p style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155", margin: 0 }}>{label}</p>
        {description && <p style={{ fontSize: "11px", color: "#94a3b8", margin: "3px 0 0" }}>{description}</p>}
      </div>
      <button type="button" onClick={() => onChange(!checked)}
        style={{ position: "relative", width: "44px", height: "24px", borderRadius: "12px", background: checked ? "#0ea5e9" : "#cbd5e1", border: "none", cursor: "pointer", outline: "none", flexShrink: 0, marginLeft: "16px", transition: "background 0.2s" }}>
        <span style={{ position: "absolute", top: "2px", width: "20px", height: "20px", background: "#fff", borderRadius: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.18)", transition: "left 0.2s", left: checked ? "22px" : "2px" }} />
      </button>
    </div>
  );
}

function SectionHeading({ title, subtitle, icon }) {
  return (
    <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "#0ea5e9", fontSize: "22px", lineHeight: 1 }}>{icon}</span>
        <div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em", fontFamily: "'DM Sans', sans-serif" }}>{title}</h2>
          <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#94a3b8" }}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function SubSection({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0 16px" }}>
      <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0ea5e9", whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace" }}>{title}</span>
      <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
    </div>
  );
}

function grid(cols = 2) {
  return { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "16px", marginBottom: "16px" };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddEmployeePage() {
  // ── Token from Zustand (React hook — correct placement) ──
  const token = useAuthStore((s) => s.token);

  const [section, setSection]       = useState("auth");
  const [form, setForm]             = useState(INITIAL);
  const [errors, setErrors]         = useState({});
  const [touched, setTouched]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult]         = useState(null);

  const handleChange = useCallback((field, raw) => {
    const val = autoCorrect(field, raw);
    setForm(prev => ({ ...prev, [field]: val }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validate(field, val) }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validate(field, form[field]) }));
  }, [form]);

  const handleBool = useCallback((field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  }, []);

  const sp = { form, errors, touched, onChange: handleChange, onBlur: handleBlur };

  const validateAll = () => {
    const newErrors = {}, newTouched = {};
    Object.keys(RULES).forEach(f => {
      newTouched[f] = true;
      const e = validate(f, form[f]);
      if (e) newErrors[f] = e;
    });
    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const SECTION_FIELDS = {
    auth:       ["username", "password"],
    basic:      ["firstName", "lastName", "email", "age"],
    work:       ["employeeId", "employmentType", "jobTitle", "position", "workLocation"],
    contact:    ["workPhone", "personalPhone", "emergencyPhone"],
    bank:       ["accountNumber", "iban", "swiftCode", "ifscCode"],
    travel:     [],
    separation: [],
  };

  const sectionHasError = (sid) =>
    (SECTION_FIELDS[sid] || []).some(f => touched[f] && errors[f]);

  const findFirstErrorSection = () => {
    for (const [sec, fields] of Object.entries(SECTION_FIELDS)) {
      if (fields.some(f => errors[f])) return sec;
    }
    return null;
  };

  // ── Build & clean payload before sending ─────────────────────────────────
  const buildPayload = () => {
    const d = { ...form };
    ["dateOfJoining", "firstEntry", "latestExit", "latestEntry", "exitDate"].forEach(k => {
      d[k] = d[k] ? new Date(d[k]).toISOString() : null;
    });
    ["age", "daysFromEntry"].forEach(k => {
      d[k] = d[k] ? parseInt(d[k], 10) : null;
    });
    ["remoteRate", "onsiteRate"].forEach(k => {
      d[k] = d[k] ? parseFloat(d[k]) : null;
    });
    Object.keys(d).forEach(k => { if (d[k] === "") d[k] = null; });
    return d;
  };

  // ── POST /api/employees/ ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateAll()) {
      setResult({ type: "error", msg: "Please fix all highlighted errors before submitting." });
      const s = findFirstErrorSection();
      if (s) setSection(s);
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      await api.post("/employees/", buildPayload(), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setResult({
        type: "success",
        msg: `Employee "${form.firstName} ${form.lastName}" (${form.employeeId || "N/A"}) created successfully!`,
      });
      setForm(INITIAL);
      setErrors({});
      setTouched({});
      setSection("auth");

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (Array.isArray(err?.response?.data?.errors)
          ? err.response.data.errors.map(e => e.msg || e.message || String(e)).join(", ")
          : null) ||
        err?.message ||
        "Something went wrong. Please try again.";
      setResult({ type: "error", msg });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Section Renders ───────────────────────────────────────────────────────
  const renderSection = () => {
    switch (section) {
      case "auth": return (
        <>
          <SectionHeading title="Account Setup" subtitle="Login credentials & access role" icon="⬡" />
          <div style={grid(2)}>
            <Input label="Username" field="username" {...sp} required placeholder="john_doe" hint="Letters, numbers, underscores only" />
            <PwInput label="Password" field="password" {...sp} required />
          </div>
          <div style={grid(2)}>
            <Select label="Role" field="role" {...sp} options={[
              { value: "EMPLOYEE", label: "Employee" },
              { value: "MANAGER",  label: "Manager"  },
              { value: "HR",       label: "HR"        },
              { value: "ADMIN",    label: "Admin"     },
            ]} />
            <div>
              <Label text="Account Status" />
              <Toggle label="Active Account" description="User can log in immediately" checked={form.isActive} onChange={v => handleBool("isActive", v)} />
            </div>
          </div>
        </>
      );

      case "basic": return (
        <>
          <SectionHeading title="Personal Information" subtitle="Identity & personal details" icon="◈" />
          <div style={grid(2)}>
            <Input label="First Name" field="firstName" {...sp} required placeholder="John" />
            <Input label="Last Name"  field="lastName"  {...sp} required placeholder="Doe" />
          </div>
          <div style={grid(2)}>
            <Input label="Email Address" field="email"    {...sp} required placeholder="john.doe@company.com" type="email" />
            <Input label="Nickname"      field="nickName" {...sp} placeholder="Johnny" />
          </div>
          <div style={grid(3)}>
            <Input label="Date of Birth" field="dob" {...sp} type="date" />
            <Input label="Age"           field="age" {...sp} placeholder="28" hint="18–80" />
            <Select label="Gender" field="gender" {...sp} options={[
              { value: "MALE",       label: "Male"            },
              { value: "FEMALE",     label: "Female"          },
              { value: "OTHER",      label: "Other"           },
              { value: "PREFER_NOT", label: "Prefer not to say" },
            ]} />
          </div>
          <div style={grid(2)}>
            <Select label="Marital Status" field="maritalStatus" {...sp} options={[
              { value: "SINGLE",   label: "Single"   },
              { value: "MARRIED",  label: "Married"  },
              { value: "DIVORCED", label: "Divorced" },
              { value: "WIDOWED",  label: "Widowed"  },
            ]} />
            <Input label="Nationality" field="nationality" {...sp} placeholder="e.g. American" />
          </div>
          <SubSection title="Professional Presence" />
          <div style={{ marginBottom: "16px" }}>
            <Textarea label="Skills" field="skills" {...sp} placeholder="React, Node.js, Project Management..." />
          </div>
          <div style={grid(2)}>
            <Input label="LinkedIn URL" field="linkedin" {...sp} placeholder="https://linkedin.com/in/..." />
            <Input label="Twitter URL"  field="twitter"  {...sp} placeholder="https://twitter.com/..." />
          </div>
        </>
      );

      case "work": return (
        <>
          <SectionHeading title="Work Details" subtitle="Employment & position information" icon="◉" />
          <div style={grid(2)}>
            <Input label="Employee ID" field="employeeId" {...sp} required placeholder="EMP-001" hint="Auto uppercased" />
            <Select label="Employment Type" field="employmentType" {...sp} required options={[
              { value: "FULL_TIME",  label: "Full-time" },
              { value: "PART_TIME",  label: "Part-time" },
              { value: "CONTRACT",   label: "Contract"  },
              { value: "FREELANCE",  label: "Freelance" },
              { value: "INTERN",     label: "Intern"    },
            ]} />
          </div>
          <div style={grid(2)}>
            <Input label="Job Title" field="jobTitle"  {...sp} required placeholder="Senior Developer" />
            <Input label="Position"  field="position"  {...sp} required placeholder="IC-4 / Manager" />
          </div>
          <div style={grid(2)}>
            <Input label="Department"    field="department"   {...sp} placeholder="Engineering" />
            <Input label="Business Unit" field="businessUnit" {...sp} placeholder="Product" />
          </div>
          <div style={grid(2)}>
            <Input label="Reporting Manager" field="reportingManager" {...sp} placeholder="Jane Smith" />
            <Input label="Work Location"     field="workLocation"     {...sp} required placeholder="New York / Remote" />
          </div>
          <SubSection title="Compensation & Schedule" />
          <div style={grid(3)}>
            <Input label="Remote Rate" field="remoteRate" {...sp} placeholder="50.00" hint="Per hour/day/month" />
            <Input label="Onsite Rate" field="onsiteRate" {...sp} placeholder="65.00" />
            <Select label="Rate Basis" field="rateBasis" {...sp} options={[
              { value: "HOURLY",  label: "Hourly"  },
              { value: "DAILY",   label: "Daily"   },
              { value: "MONTHLY", label: "Monthly" },
              { value: "ANNUAL",  label: "Annual"  },
            ]} />
          </div>
          <div style={grid(3)}>
            <Input label="Date of Joining" field="dateOfJoining" {...sp} type="date" />
            <Select label="Employee Status" field="employeeStatus" {...sp} options={[
              { value: "ACTIVE",    label: "Active"    },
              { value: "PROBATION", label: "Probation" },
              { value: "INACTIVE",  label: "Inactive"  },
              { value: "SUSPENDED", label: "Suspended" },
            ]} />
            <Select label="Leave Policy" field="leavePolicy" {...sp} options={[
              { value: "STANDARD",  label: "Standard"  },
              { value: "FLEXIBLE",  label: "Flexible"  },
              { value: "UNLIMITED", label: "Unlimited" },
            ]} />
          </div>
          <Toggle label="Timesheet Required" description="Employee must submit weekly timesheets" checked={form.timesheetRequired} onChange={v => handleBool("timesheetRequired", v)} />
        </>
      );

      case "contact": return (
        <>
          <SectionHeading title="Contact Information" subtitle="Phone numbers & addresses" icon="◎" />
          <div style={grid(2)}>
            <Input label="Work Phone"     field="workPhone"     {...sp} placeholder="+1 555 000 0000" type="tel" />
            <Input label="Personal Phone" field="personalPhone" {...sp} placeholder="+1 555 000 0001" type="tel" />
          </div>
          <SubSection title="Addresses" />
          <div style={{ marginBottom: "16px" }}>
            <Textarea label="Present Address"   field="presentAddress"   {...sp} placeholder="123 Main St, City, State 10001" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <Textarea label="Permanent Address" field="permanentAddress" {...sp} placeholder="456 Home Ave, City, State 20002" />
          </div>
          <SubSection title="Emergency Contact" />
          <div style={grid(3)}>
            <Input label="Contact Name"    field="emergencyName"  {...sp} placeholder="Jane Doe" />
            <Input label="Relationship"    field="relationship"   {...sp} placeholder="Spouse / Parent" />
            <Input label="Emergency Phone" field="emergencyPhone" {...sp} placeholder="+1 555 999 0000" type="tel" />
          </div>
        </>
      );

      case "bank": return (
        <>
          <SectionHeading title="Banking Details" subtitle="Payment & account information" icon="▣" />
          <div style={grid(2)}>
            <Input label="Bank Name" field="bankName" {...sp} placeholder="Chase Bank" />
            <Select label="Bank Country" field="bankCountry" {...sp} options={[
              { value: "US",    label: "United States"  },
              { value: "GB",    label: "United Kingdom" },
              { value: "AE",    label: "UAE"            },
              { value: "IN",    label: "India"          },
              { value: "AU",    label: "Australia"      },
              { value: "CA",    label: "Canada"         },
              { value: "SG",    label: "Singapore"      },
              { value: "OTHER", label: "Other"          },
            ]} />
          </div>
          <div style={grid(2)}>
            <Select label="Account Type" field="accountType" {...sp} options={[
              { value: "CHECKING", label: "Checking" },
              { value: "SAVINGS",  label: "Savings"  },
              { value: "CURRENT",  label: "Current"  },
            ]} />
            <Input label="Account Number" field="accountNumber" {...sp} placeholder="ACCT12345678" />
          </div>
          <SubSection title="International Codes" />
          <div style={grid(2)}>
            <Input label="IBAN"        field="iban"      {...sp} placeholder="GB29NWBK60161331926819" hint="International Bank Account Number" />
            <Input label="SWIFT / BIC" field="swiftCode" {...sp} placeholder="CHASUS33XXX" hint="8 or 11 characters" />
          </div>
          <div style={grid(2)}>
            <Input label="Routing Code" field="routingCode" {...sp} placeholder="021000021"  hint="US routing number (9 digits)" />
            <Input label="IFSC Code"    field="ifscCode"    {...sp} placeholder="HDFC0001234" hint="Indian bank code" />
          </div>
        </>
      );

      case "travel": return (
        <>
          <SectionHeading title="Travel Records" subtitle="Entry & exit history" icon="◆" />
          <div style={grid(2)}>
            <Input label="First Entry Date"  field="firstEntry"    {...sp} type="date" hint="Initial country entry" />
            <Input label="Latest Entry Date" field="latestEntry"   {...sp} type="date" hint="Most recent entry" />
          </div>
          <div style={grid(2)}>
            <Input label="Latest Exit Date" field="latestExit"    {...sp} type="date" hint="Most recent exit" />
            <Input label="Days Since Entry" field="daysFromEntry" {...sp} placeholder="90" hint="Total days since entry" />
          </div>
        </>
      );

      case "separation": return (
        <>
          <SectionHeading title="Exit / Separation" subtitle="Offboarding details (if applicable)" icon="◐" />
          <div style={grid(2)}>
            <Input label="Exit Date" field="exitDate" {...sp} type="date" />
            <Select label="Exit Reason" field="exitReason" {...sp} options={[
              { value: "RESIGNED",     label: "Resigned"     },
              { value: "TERMINATED",   label: "Terminated"   },
              { value: "CONTRACT_END", label: "Contract End" },
              { value: "RETIRED",      label: "Retired"      },
              { value: "LAID_OFF",     label: "Laid Off"     },
              { value: "OTHER",        label: "Other"        },
            ]} />
          </div>
          <div style={{ marginTop: "12px" }}>
            <Toggle label="Eligible for Rehire" description="Employee may be considered for future positions" checked={form.canJoinAgain} onChange={v => handleBool("canJoinAgain", v)} />
          </div>
        </>
      );

      default: return null;
    }
  };

  const idx      = SECTIONS.findIndex(s => s.id === section);
  const progress = Math.round(((idx + 1) / SECTIONS.length) * 100);
  const isLast   = idx === SECTIONS.length - 1;
  const isFirst  = idx === 0;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        input:focus, select:focus, textarea:focus { outline: none; }
        button:focus-visible { outline: 2px solid #0ea5e9; outline-offset: 2px; }
        @keyframes spin   { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── Top step-progress header ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", flexShrink: 0, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>

        {/* Step tabs */}
        <div style={{ display: "flex", padding: "0 20px", overflowX: "auto", gap: "2px" }}>
          {SECTIONS.map((s, i) => {
            const active  = s.id === section;
            const done    = i < idx;
            const hasErr  = sectionHasError(s.id);
            return (
              <button key={s.id} type="button" onClick={() => setSection(s.id)} style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "9px 16px 8px", flexShrink: 0,
                background: active ? "#f0f9ff" : "transparent",
                border: "none", borderBottom: active ? "2.5px solid #0ea5e9" : "2.5px solid transparent",
                borderRadius: "6px 6px 0 0",
                cursor: "pointer", transition: "all 0.15s", marginBottom: "-1px",
              }}>
                <span style={{
                  width: "19px", height: "19px", borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "9px", fontWeight: 800,
                  background: active ? "#0ea5e9" : hasErr ? "#fef2f2" : done ? "#f0fdf4" : "#f1f5f9",
                  color:      active ? "#fff"    : hasErr ? "#f43f5e" : done ? "#16a34a" : "#94a3b8",
                  border:     active ? "none"    : hasErr ? "1.5px solid #fecaca" : done ? "1.5px solid #86efac" : "1.5px solid #e2e8f0",
                }}>
                  {hasErr ? "!" : done ? "✓" : i + 1}
                </span>
                <span style={{ fontSize: "12px", fontWeight: active ? 700 : 500, color: active ? "#0ea5e9" : hasErr ? "#f43f5e" : done ? "#334155" : "#94a3b8" }}>
                  {s.label}
                </span>
              </button>
            );
          })}

          {/* Progress % badge */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", paddingRight: "8px" }}>
            <span style={{ fontSize: "10.5px", color: "#94a3b8", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
              Step {idx + 1} of {SECTIONS.length}
            </span>
            <span style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#0ea5e9", fontWeight: 700, background: "#eff6ff", padding: "2px 9px", borderRadius: "20px", border: "1px solid #bae6fd", whiteSpace: "nowrap" }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Animated progress bar */}
        <div style={{ height: "3px", background: "#e2e8f0" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#0ea5e9,#6366f1)", transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
      </div>

      {/* ── Scrollable form body ── */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>

        {/* Result banner */}
        {result && (
          <div style={{
            margin: "16px 28px 0", padding: "12px 16px", borderRadius: "8px",
            display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
            background: result.type === "success" ? "#f0fdf4" : "#fff1f2",
            border:     result.type === "success" ? "1.5px solid #86efac" : "1.5px solid #fecaca",
            color:      result.type === "success" ? "#16a34a" : "#dc2626",
            fontSize: "13px", fontWeight: 600,
          }}>
            <span style={{ fontSize: "16px" }}>{result.type === "success" ? "✅" : "❌"}</span>
            {result.msg}
          </div>
        )}

        {/* Form card */}
        <div style={{ flex: 1, padding: "20px 28px 0", animation: "fadeIn 0.2s ease" }}>
          <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "28px 36px", height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {renderSection()}
          </div>
        </div>

        {/* ── Bottom nav bar ── */}
        <div style={{ padding: "14px 28px", background: "#fff", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, boxShadow: "0 -1px 6px rgba(0,0,0,0.04)" }}>

          <button type="button" onClick={() => setSection(SECTIONS[idx - 1]?.id)} disabled={isFirst}
            style={{ padding: "9px 20px", background: isFirst ? "#f8fafc" : "#fff", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: isFirst ? "#cbd5e1" : "#475569", cursor: isFirst ? "default" : "pointer", transition: "all 0.15s" }}>
            ← Back
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {SECTIONS.map((s, i) => (
              <div key={s.id} onClick={() => setSection(s.id)} style={{
                width: s.id === section ? "20px" : "6px", height: "6px", borderRadius: "3px",
                background: s.id === section ? "#0ea5e9" : i < idx ? "#bae6fd" : "#e2e8f0",
                transition: "all 0.3s", cursor: "pointer",
              }} />
            ))}
          </div>

          {!isLast ? (
            <button type="button" onClick={() => setSection(SECTIONS[idx + 1]?.id)}
              style={{ padding: "9px 24px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(14,165,233,0.3)", transition: "all 0.15s" }}>
              Continue →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={submitting}
              style={{ padding: "9px 28px", background: submitting ? "#94a3b8" : "linear-gradient(135deg,#22c55e,#16a34a)", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: "#fff", cursor: submitting ? "default" : "pointer", boxShadow: "0 2px 8px rgba(34,197,94,0.3)", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "8px" }}>
              {submitting
                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Saving…</>
                : "✓ Create Employee"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}