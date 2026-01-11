from fastapi import FastAPI
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Consent Transparency Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load risk rules
with open("risk_rules.json") as f:
    RISK_RULES = json.load(f)

# -------- DATA MODELS --------

class ConsentInput(BaseModel):
    app_name: str
    permissions: list[str]
    policy_text: str

# -------- AI SIMPLIFICATION (mock or real) --------

def simplify_policy(text: str) -> dict:
    """
    Replace this with real LLM call if available.
    For hackathon: deterministic + believable.
    """
    summary = "This app can access your financial data"
    
    flags = []
    if "third" in text.lower():
        summary += " and share it with third parties"
        flags.append("THIRD_PARTY_SHARING")
    if "marketing" in text.lower():
        summary += " for marketing purposes"
        flags.append("MARKETING")

    return {
        "summary": summary + ".",
        "flags": flags
    }

# -------- RISK SCORING --------

def calculate_risk(permissions, flags):
    score = 0
    reasons = []

    for p in permissions:
        if p in RISK_RULES:
            score += RISK_RULES[p]
            reasons.append(p)

    for f in flags:
        if f in RISK_RULES:
            score += RISK_RULES[f]
            reasons.append(f)

    if score <= 3:
        level = "Low"
    elif score <= 6:
        level = "Medium"
    else:
        level = "High"

    return score, level, reasons

# -------- API ENDPOINT --------

@app.post("/analyze-consent")
def analyze_consent(data: ConsentInput):
    ai_result = simplify_policy(data.policy_text)

    score, level, reasons = calculate_risk(
        data.permissions,
        ai_result["flags"]
    )

    return {
        "app": data.app_name,
        "plain_english_summary": ai_result["summary"],
        "risk_score": score,
        "risk_level": level,
        "why_it_matters": reasons
    }
