# Consent Transparency Engine

A lightweight fintech-focused tool that helps users understand what they are actually agreeing to when they accept long and complex consent or privacy agreements.

---

## 🚩 Problem Statement

In fintech and healthcare platforms, users are required to accept long legal agreements to access services.  
These documents are:
- difficult to understand,
- filled with legal jargon,
- and often hide important permissions such as data sharing, long-term consent, or limited liability.

As a result, users give **informed consent legally, but not practically**.

---

## 💡 Solution Overview

The Consent Transparency Engine analyzes consent or privacy agreements and:
- summarizes them in plain English,
- extracts implicit permissions hidden in legal text,
- assigns an explainable risk score based on predefined rules.

The goal is **transparency**, not enforcement.

---

## 🧠 How It Works

### 1. User Input
- User pastes a consent or privacy agreement into the UI.

### 2. Agreement Interpretation
- The system analyzes the text to identify implicit permissions such as:
  - third-party data sharing
  - long-term consent
  - limited liability
  - complex legal obligations

### 3. Risk Scoring (Explainable)
- Each identified permission has a predefined risk weight.
- The total risk score is calculated using rule-based logic.
- Risk levels are categorized as **Low**, **Medium**, or **High**.

### 4. Output
- Plain-English summary
- Risk score and level
- Clear explanation of why the agreement may be risky

---

## ⚙️ Tech Stack

### Frontend
- React
- Simple document-focused UI

### Backend
- FastAPI (Python)
- Rule-based risk scoring engine

### AI / NLP (Pluggable)
- Architecture supports LLM-based interpretation
- For hackathon reliability, deterministic extraction is used
- LLM integration can be enabled when API quota is available

---

